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
        const userName = email.split(" ")[0].split(".")[0]
        const user = await User.create({ ...req.body, userName });
        if (!user) {
            throw "user could not be created!"
        };
        const token = getToken(user._id);
        res.status(200).json({
            success: true,
            user: { ...user._doc, token }
        });
    } catch (error) {
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
        const user = await User.findOne({ email });
        if (!user) {
            throw "user not found"
        };
        if (!await user.matchPassword(password)) {
            throw "passwords don't match"
        };
        const token = getToken(user);
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

export {
    signUp, signIn
}