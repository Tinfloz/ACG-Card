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
        const tag = await Tag.findOne({ tag: tagName });
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
        user.subscribedTags = user.subscribedTags.filter(id => id !== tag._id.toString());
        await user.save()
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
        let contentArray = (await Content.find({ _id: { $in: user.subscribedTags } })).map(el => el.contentStr);
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

const getEventsByTagAndUsers = async (req, res) => {
    try {
        const { userName } = req.params;
        if (!userName) {
            throw "no params";
        };
        const user = await User.findOne({ userName });
        const eventsArray = (await Event.find({ _id: { $in: user.subscribedTags } })).map(el => el);
        res.status(200).json({
            success: true,
            eventsArray
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
    getContentByTagsAndUsers,
    getEventsByTagAndUsers
}