import Tag from "../models/tags.model.js";
import Content from "../models/content.model.js";

const createContentTag = async (req, res) => {
    try {
        const { tagName } = req.body;
        if (!tagName) {
            throw "tag name not found"
        };
        const newTag = await Tag.create({
            tag: tagName
        });
        if (!newTag) {
            throw "could not be created"
        }
        res.status(200).json({
            success: true,
            tag: newTag
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const deleteContentTag = async (req, res) => {
    try {
        const { tagName } = req.params;
        if (!tagName) {
            throw "no tag name"
        };
        const tag = await Tag.findOne({ tagName });
        await tag.remove();
        res.status(200).json({
            success: true,
            tag: tagName
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const createMarketingContent = async (req, res) => {
    try {
        const { contentStr } = req.body;
        const { tag } = req.params;
        if (!contentStr || !tag) {
            throw "no tag / content string"
        };
        const newContent = await Content.create({
            contentStr, tag
        });
        if (!newContent) {
            throw "content could not be created"
        }
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const deleteMarketingContent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw "no id"
        };
        const content = await Content.findById(id);
        await content.remove();
        res.status(200).json({
            success: true,
            contentId: id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const getContentByTag = async (req, res) => {
    try {
        const { tag } = req.params;
        if (!tag) {
            throw "no tag found"
        };
        let contentArray = [];
        for await (let i of Content.find()) {
            if (i.tag === tag) {
                contentArray.push(i);
            };
        };
        res.status(200).json({
            success: true,
            conetent: contentArray
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

export {
    createContentTag,
    deleteContentTag,
    createMarketingContent,
    deleteMarketingContent,
    getContentByTag
}