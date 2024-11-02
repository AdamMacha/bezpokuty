import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        phone: String,
        street: String,
        city: String,
        zipCode: String,
        email: String,
        purchased: {
            type: Boolean,
            default: false
        },
        packageType: String,
        stripeSessionId: {
            type: String,
            unique: true,
            sparse: true
        }
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;