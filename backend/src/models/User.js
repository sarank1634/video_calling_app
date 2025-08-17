import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 6},
    bio: {type: String},
    profilePicture: {type: String},
    nativeLanguage: {type: String},
    learningLanguage: {type: String},
    isOnboarding: { type: Boolean, default: false},
    friends: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
}, {timestamps:true});


userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    try {
        const salt= await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);



export default User;