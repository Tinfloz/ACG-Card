import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    contentStr: {
        type: String,
        required: true
    },
    tag: {
        type: mongoose.Types.ObjectId,
        ref: "Tags"
    }

}, { timestamps: true });


const Content = mongoose.model("Content", contentSchema);

export default Content;