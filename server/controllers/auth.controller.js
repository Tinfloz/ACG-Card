import User from "../models/user.model.js";
import { getToken } from "../helpers/get.token.js";

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw "fields empty";
        };
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw "user already exists"
        };
        if (email.split("@")[1] !== "acg-world.com") {
            throw `${email.split("@")[1]} not allowed`;
        };
        const name = email.split("@")[0].split(".");
        const userName = `${name[0][0].toUpperCase() + name[0].slice(1)} ${name[1][0].toUpperCase() + name[1].slice(1)}`
        const searchKey = email.split("@")[0].split(".")[0] + email.split("@")[0].split(".")[1];
        const user = await User.create({ ...req.body, userName, searchKey });
        if (!user) {
            throw "user could not be created!"
        };
        const token = getToken(user._id);
        res.status(200).json({
            success: true,
            user: { ...user._doc, token }
        });
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw "fields empty";
        };
        const user = await User.findOne({ email }).populate("subscribedTags");
        if (!user) {
            throw "user not found"
        };
        if (!await user.matchPassword(password)) {
            throw "passwords don't match"
        };
        const token = getToken(user._id);
        res.status(200).json({
            success: true,
            user: { ...user._doc, token }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const setRole = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
        res.status(200).json({
            success: true,
            details: {
                role: user.role,
                userPhotoStr: user.userPhotoStr,
                linkedIn: user.linkedIn,
                bio: user.bio
            }
        });
    } catch (error) {
        console.error(error)
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

const changeUserBioAndPhoto = async (req, res) => {
    try {
        const { bio, userPhotoStr } = req.body;
        console.log(bio)
        const user = await User.findById(req.user._id);
        user.bio = bio || user.bio;
        user.userPhotoStr = userPhotoStr || user.userPhotoStr;
        await user.save();
        res.status(200).json({
            success: true,
            changes: req.body,
        });
    } catch (error) {
        console.error(error)
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};

export {
    signUp, signIn, setRole, changeUserBioAndPhoto
}