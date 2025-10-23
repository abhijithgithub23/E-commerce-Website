import User from  "../models/user.model.js";

import {redis} from "../lib/reddis.js";

import jwt from "jsonwebtoken"; //creating access and refresh token for a user
const generateTokens=(userId)=>{
    const accessToken=jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET,{ expiresIn:"15m"} );
    const refreshToken=jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET,{ expiresIn:"7d"} );
    return {accessToken, refreshToken};
}

const storeRefreshToken = async (userId, refreshToken) => {// storing refresh token for a user in redis
    await redis.set(`refresh_token:${userId}`, refreshToken, "Ex", 7*24*60*60); // 7days
}

const setCookies=(res, accessToken, refreshToken)=>{
    res.cookie("accessToken", accessToken, { 
        httpOnly: true , //prevent XSS attacks
        secure: process.env.NODE_ENV==="production",
        sameSite: "strict" ,// prevents CSRF attacks 
        maxAge: 15 * 60 * 1000 , //15 minutes
    });
    res.cookie("refreshToken", refreshToken, { 
        httpOnly: true , //prevent XSS attacks
        secure: process.env.NODE_ENV==="production",
        sameSite: "strict" ,// prevents CSRF attacks 
        maxAge: 7 * 24 * 60 * 60 * 1000 , // 7 days 
    });
}

export const signup= async (req, res)=>{
    const { name, email, password}=req.body;

    try {
        const userExist=await User.findOne({email}); //check if user already exist
        if(userExist){
         return res.status(400).json({message: "User already exist"});
        }

        const user= await User.create({name, email, password});

        // authetication , generating tokens for the user
        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        //set cookies
        setCookies(res, accessToken, refreshToken);

        res.status(201).json({user:{
                _id: user._id,
                name: user.name,
                email:user.email,
                role: user.role,
            }, 
        message: "User created Successfully"});

    } catch (error) {
        console.log("Error in Signup controller", error.message);
        res.status(500).json({message: error.message});
    }
} 

export const login= async (req, res)=>{
    try {
        const { email, password}=req.body;
        const user= await User.findOne({email});
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        
        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);
        setCookies(res, accessToken, refreshToken);
             
        res.status(200).json({user:{
            _id: user._id,
            name: user.name,
            email:user.email,
            role: user.role,
        }, 
        message: "User Logged In Successfully"});
        

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({message: error.message});
    }
} 

export const logout= async (req, res)=>{
    try {
        const refreshToken= req.cookies.refreshToken;
        if(refreshToken){
            const decoded=jwt.verify( refreshToken , process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`);
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({message: "Logged out Successfully"});

    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: error.message});
    }
} 

// Refreshing the access token of a loggedIn user
export const refreshToken = async (req, res)=>{
    try {
        const refreshToken= req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message: "No refresh Token"});
        }
        const decoded=jwt.verify( refreshToken , process.env.REFRESH_TOKEN_SECRET);
        const storedToken=await redis.get(`refresh_token:${decoded.userId}`);

        if(storedToken !== refreshToken){
            return res.status(401).json({message: "Invalid Token"});
        }

        const accessToken=jwt.sign({userId : decoded.userId}, process.env.ACCESS_TOKEN_SECRET,{ expiresIn:"15m"} );
        res.cookie("accessToken", accessToken, { 
            httpOnly: true , //prevent XSS attacks
            secure: process.env.NODE_ENV==="production",
            sameSite: "strict" ,// prevents CSRF attacks 
            maxAge: 15 * 60 * 1000 , //15 minutes
        });
        res.json({message: "Access Token Refreshed Successfully"});

    } catch (error) {
        console.log("Error in refreshToken controller", error.message);
        res.status(500).json({message: error.message});
    }
}

export const getProfile=async (req, res)=>{
    try {
        
        res.json(req.user);

    } catch (error) {
        console.log("Error in getProfile controller", error.message);
        res.status(500).json({message: error.message});
    }
}
