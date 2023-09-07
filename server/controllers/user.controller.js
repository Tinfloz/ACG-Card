import User from "../models/user.model.js";
import Tag from "../models/tags.model.js";
import Content from "../models/content.model.js";
import Event from "../models/event.model.js";

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

const subscribeToTags = async (req, res) => {
    try {
        const { tagName } = req.body;
        const user = await User.findById(req.user._id);
        const tag = await Tag.findOne({ tag: tagName })
        const index = user.subscribedTags.findIndex(el => el.country === tag.location);
        if (index !== -1) {
            user.subscribedTags[index].tags.includes(tag._id) ? null : user.subscribedTags[index].tags.push(tag._id)
        } else {
            user.subscribedTags.push({
                country: tag.location,
                tags: [tag._id]
            });
        };
        await user.save();
        res.status(200).json({
            success: true,
            subscribedTags: user.subscribedTags
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const unsubscribeTags = async (req, res) => {
    try {
        const { tagName } = req.body;
        const tag = await Tag.findOne({ tag: tagName });
        const user = await User.findById(req.user._id);
        const index = user.subscribedTags.findIndex(el => el.country === tag.location);
        console.log(user.subscribedTags[index].tags, "idx")
        user.subscribedTags[index].tags = user.subscribedTags[index].tags.filter(el => el.toString() !== tag._id.toString());
        await user.save();
        res.status(200).json({
            success: true,
            subscribedTags: user.subscribedTags
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const getAllUserTagsByLocation = async (req, res) => {
    try {
        const { location } = req.params;
        const user = await User.findById(req.user._id).populate({
            path: "subscribedTags",
            populate: {
                path: "tags",
                model: "Tags"
            }
        });
        const tagsOfInterest = user.subscribedTags.filter(el => el.country === (location.charAt(0).toUpperCase() + location.slice(1)))[0].tags;
        res.status(200).json({
            success: true,
            tagArray: tagsOfInterest
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const setPriorityForTagsByCountry = async (req, res) => {
    try {
        const { location } = req.params;
        const { priorityChange } = req.body;
        const finalPriorityArray = priorityChange.map(el => el._id);
        const user = await User.findById(req.user._id);
        user.subscribedTags.filter(el => el.country === (location.charAt(0).toUpperCase() + location.slice(1)))[0].tags = finalPriorityArray;
        await user.save();
        res.status(200).json({
            success: true,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const getCountriesForPriority = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const countries = user.subscribedTags.map(el => el.country);
        res.status(200).json({
            success: true,
            countries
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
    getAllUserTagsByLocation,
    setPriorityForTagsByCountry,
    getCountriesForPriority
}