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
    purchased: Boolean,
     },
{ timestamps: true }
);

 const User = mongoose.models.User || mongoose.model("User", userSchema);

 export default User;