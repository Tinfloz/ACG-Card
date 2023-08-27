import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    tag: {
        type: mongoose.Types.ObjectId,
        ref: "Tags"
    }
}, { timestamps: true })

const Event = mongoose.model("Events", eventSchema);

export default Event;