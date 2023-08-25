import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tag: {
        type: String
    }
}, { timestamps: true })

const Tag = mongoose.model("Tags", tagSchema);

export default Tag;