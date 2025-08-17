import User from "../models/User.js";
import jwt from 'jsonwebtoken'
export async function signup(req,res){
   const {email, password, fullName } = req.body;

   try {
    if(!email || !password || !fullName) {
        return res.status(400).json({message: "All fields are required"})
    }
    if(password.length < 6){
        return res.status(400).json({message: "Password must be at least 6 characters long"})
    }
     
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
         return res.status(400).json({ message: "Invalid email format" });
    } 

    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({message: "email already exists, please use a different one"})
    }

    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`; 

    const newUser =  await User.create ({
        fullName,
        email,
        password,
        // profilePicture: randomAvatar,
    })
  
    const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: "7d"
    });

    res.cookie("jwt", token,{
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
    });

    res.status(201).json({success: true, user: newUser})
   } catch (error) {
    console.log("Error in the signup controller", error);
    return res.status(500).json({success: false, message: "Error in the signup controller"})
   }
}

export async function login(req,res){
  
try {
    const { email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: "All fields are required"})
    }

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "Invaild email or Password"})
    
    const isPasswordCorrect = await user.matchPassword(password);
    if(!isPasswordCorrect) return res.status(400).json({message: "Invaild email or Password"})

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET_KEY,{
            expiresIn: "7d"
        });
    
        res.cookie("jwt", token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production"
        });

        res.status(200).json({success: true, user: user})

} catch (error) {
    console.log("Error in the login controller", error);
    return res.status(500).json({success: false, message: "Error in the login controller"}) 
}
}


export async function logout(req,res){
    res.clearCookie("jwt")
    res.status(200).json({success: true, message: "User logged out successfully"});
} 