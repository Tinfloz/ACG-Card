import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: {
        type: String
    },
    resetTokenExpires: {
        type: String
    },
    subscribedTags: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Tags"
        }
    ]
}, { timestamps: true })

// hash password
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return next()
    };
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.matchPassword = async function (entPwd) {
    return await bcrypt.compare(entPwd, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;