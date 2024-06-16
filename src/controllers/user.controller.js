// import { response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "./../utils/ApiError.js"
import { User } from "./../models/user.model.js"
import { uploadOnCloudinary } from "./../utils/cloudinary.js"
import { ApiResponse } from "./../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res) => {
    // steps to register user
    // get  user details from frontend i.e (postman)
    // validation - not empty    
    // check if user already exists: username , email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entery in db 
    // remove password and refresh token from response
    // check for user creation
    /// return res

    const {fullName, email, username, password } = req.body;

    // if(fullName === "") {
    //     throw new ApiError(400, "fullname is required")
    // }          //// it is also good method to check


    if(
        [fullName, email, username, password].some((field)=> {
            field?.trim() === ""}
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ 
        $or: [{ username } , { email }]
     })

     if(existedUser) {
        throw new ApiError(409, "User with email or username already exists")
     }

     const avatarLocalPath = req.files?.avatar[0]?.path;
    //  const coverImageLocalPath = req.file?.coverImage[0]?.path;

     let coverImageLocalPath;
     if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path;
     }

     if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is require");
     }

     const avatar = await uploadOnCloudinary( avatarLocalPath );
     const coverImage = await uploadOnCloudinary( coverImageLocalPath );

     if(!avatar){
        throw new ApiError(400, "Avatar file is Required")
     }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(    // we cannot send the password and 
        "-password -refreshToken"                                // refresh token as a response to user
    );

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user");
    }

    return res.status(201).json( new ApiResponse(200, createdUser, "User registerd Successfully"))

})


export { registerUser }
