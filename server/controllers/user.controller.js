import User from "../models/user.model.js";
import Tag from "../models/tags.model.js";
import Content from "../models/content.model.js";
import Event from "../models/event.model.js";

const subscribeToTags = async (req, res) => {
    try {
        const { tagName } = req.body;
        console.log(tagName)
        if (!tagName) {
            throw "no params";
        };
        const user = await User.findById(req.user._id);
        const tag = await Tag.findOne({ tag: tagName });
        console.log(tag)
        user.subscribedTags.push(tag._id);
        await user.save();
        res.status(200).json({
            success: true,
            tag
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
        const { tagName } = req.body;
        if (!tagName) {
            throw "no params";
        };
        const user = await User.findById(req.user._id).populate("subscribedTags");
        const tag = await Tag.findOne({ tag: tagName });
        user.subscribedTags = user.subscribedTags.filter(el => el._id.toString() !== tag._id.toString());
        await user.save()
        res.status(200).json({
            success: true,
            tag: user.subscribedTags
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const getAllUserContent = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const tagsOfInterest = user?.subscribedTags?.map(el => el.toString());
        const allContent = await Content.find();
        const userContentArray = allContent?.filter(el => tagsOfInterest.includes(el.tag.toString()));
        res.status(200).json({
            success: false,
            userContentArray
        })
    } catch (error) {
        console.error(error)
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const getAllUserEvent = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const tagsOfInterest = user?.subscribedTags?.map(el => el.toString());
        const allEvent = await Event.find();
        const userEventArray = allEvent?.filter(el => tagsOfInterest.includes(el.tag.toString()));
        res.status(200).json({
            success: false,
            userEventArray
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
    getAllUserContent,
    getAllUserEvent,
}