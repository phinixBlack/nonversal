import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Provide username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide password"],
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    VerifyToken: String,
    VerifyTokenExpiry: Date,

})

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;