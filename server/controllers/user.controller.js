import User from "../models/user.model.js";
import Tag from "../models/tags.model.js";
import Content from "../models/content.model.js";

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


export {
    subscribeToTags,
    unsubscribeTags,
}