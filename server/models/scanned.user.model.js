import mongoose from "mongoose";

const scannedUserSchema = new mongoose.Schema({
    fingerprint: {
        type: String,
        required: true
    },
    IPv6: {
        type: String,
        required: true
    },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: {
            type: [Number],
            default: undefined,
            required: true
        },
    },
    country: {
        type: String,
        required: true
    },
    associates: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Users"
        }
    ]
}, { timestamps: true })

const ScannedUser = mongoose.model("ScannedUser", scannedUserSchema);
export default ScannedUser;