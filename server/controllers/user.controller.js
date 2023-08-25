import User from "../models/user.model.js";
import Tag from "../models/tags.model.js";
import Content from "../models/content.model.js";

const subscribeToTags = async (req, res) => {
    try {
        const { tagName } = req.params;
        if (!tagName) {
            throw "no params";
        };
        const user = await User.findById(req.user._id);
        const tag = await Tag.findOne({ tagName });
        user.subscribedTags.push(tag._id);
        await user.save();
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

const unsubscribeTags = async (req, res) => {
    try {
        const { tagName } = req.params;
        if (!tagName) {
            throw "no params";
        };
        const user = await User.findById(req.user._id);
        const tag = await Tag.findOne({ tagName });
        for (let i of user.subscribedTags) {
            if (i === tag._id.toString()) {
                let index = user.subscribedTags.indexOf(i);
                user.subscribedTags.splice(index, 1);
                break
            };
        };
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

const getContentByTagsAndUsers = async (req, res) => {
    try {
        const { userName } = req.params;
        if (!userName) {
            throw "no params";
        };
        const user = await User.findOne({ userName });
        let contentArray = [];
        for await (let i of Content.find()) {
            if (user.subscribedTags.includes(i._id.toString())) {
                contentArray.push(i.contentStr);
            };
        };
        res.status(200).json({
            success: true,
            contentArray
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

export {
    subscribeToTags,
    unsubscribeTags,
    getContentByTagsAndUsers
}