import Tag from "../models/tags.model.js";
import Content from "../models/content.model.js";
import Event from "../models/event.model.js";

const createContentTag = async (req, res) => {
    try {
        const { tagName, location } = req.body;
        if (!tagName || !location) {
            throw "tag name not found"
        };
        const newTag = await Tag.create({
            tag: tagName,
            location
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
        console.log(tagName, "in controller")
        if (!tagName) {
            throw "no tag name"
        };
        const tag = await Tag.findOne({ tag: tagName });
        await tag.deleteOne();
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

const getAllTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json({
            success: true,
            tags
        })
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
        const selectedTag = await Tag.findOne({ tag });
        if (!selectedTag) {
            throw "no such tag found"
        }
        const newContent = await Content.create({
            contentStr, tag: selectedTag._id
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
        await content.deleteOne();
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
        const selectedTag = await Tag.findOne({ tag })
        let contentArray = (await Content.find({ tag: selectedTag._id })).map(el => el.contentStr);
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

const createNewEvent = async (req, res) => {
    try {
        const { eventName, location, date, tag } = req.body;
        if (!eventName || !location || !date || !tag) {
            throw "info missing"
        };
        const selectedTag = await Tag.findOne({ tag });
        if (!selectedTag) {
            throw "no such tag found"
        };
        const event = await Event.create({
            eventName, location, date, tag: selectedTag._id
        });
        if (!event) {
            throw "event could not be created"
        };
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(400).json({
            success: true,
            error: error.errors?.[0]?.message || error
        });
    };
};

const getAllEventsByTag = async (req, res) => {
    try {
        const { tag } = req.params;
        if (!tag) {
            throw "no params"
        };
        const selectedTag = await Tag.findOne({ tag });
        if (!selectedTag) {
            throw "no such tag found"
        };
        const eventsArray = (await Event.find({ tag: selectedTag._id })).map(el => el);
        res.status(200).json({
            success: true,
            eventsArray
        });
    } catch (error) {
        res.status(400).json({
            success: true,
            error: error.errors?.[0]?.message || error
        });
    };
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw "no params"
        };
        const event = await Event.findById(id);
        await event.deleteOne();
        res.status(200).json({
            success: true,
            id
        });
    } catch (error) {
        res.status(400).json({
            success: true,
            error: error.errors?.[0]?.message || error
        });
    };
};

export {
    createContentTag,
    deleteContentTag,
    getAllTags,
    createMarketingContent,
    deleteMarketingContent,
    getContentByTag,
    createNewEvent,
    deleteEvent,
    getAllEventsByTag
}