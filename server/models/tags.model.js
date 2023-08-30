import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tag: {
        type: String
    },
    location: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Tag = mongoose.model("Tags", tagSchema);

export default Tag;