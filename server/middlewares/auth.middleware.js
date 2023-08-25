import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const auth = async (req, res) => {
    try {
        if (!req.headers) {
            throw "no headers"
        };
        // extract bearer token from header
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw "no token";
        };
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.id);
        if (!req.user) {
            throw "user not found";
        };
        return next();
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.errors?.[0]?.message || error
        });
    };
};