
import { catchAsyncErrors } from '../middlewares/catchAsyncErrors.js';
import { ErrorHandler } from '../middlewares/error.js';
import cloudinary from 'cloudinary';
import { User } from './../Models/userSchema.js';
import { sendToken } from '../utils/jwtToken.js';

//User Resgister Controllers
export const register = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("User Avatar required!", 400));
    }
    const { avatar } = req.files;
    const allowedFormats = [
        "image/png", "image/jpeg", "image/webp",
        "image/svg", "image/pdf",
    ];
    if (!allowedFormats.includes(avatar.mimetype)) {
        return next(
          new ErrorHandler(
            "Please provide avatar in png,jpg,webp or avif format!",
            400
          )
        );
      }
    const { Name, Email, Phone_no, Password } = req.body;
    if (!Name || !Email || !Phone_no || !Password) {
        return next(new ErrorHandler("Please fill form correctly", 400))
    }
    let user = await User.findOne({ Email });
    if (user) {
        return next(new ErrorHandler("User Already Exist!", 400))
    }
    const imagesRespons = await cloudinary.uploader.upload(avatar.tempFilePath);
    if (!imagesRespons || imagesRespons.error) {
        console.log("cloudinary Error:", imagesRespons.error || "unknown cloudinary error");

    }
    user = await User.create({
        Name, Email, Phone_no, Password, avatar: {
            Public_id: imagesRespons.Public_id,
            Url: imagesRespons.secure_Url,
        },
    });
    sendToken("User Register SuccessFully",user,res,201)

});
//User Login Controllers
export const login = catchAsyncErrors(async(req, res, next) => { 
    const {Email, Password} =req.body;
    if(!Email || !Password ){
        return next(new ErrorHandler ("Please Provide Email or Password!",400))
    }
    const user= await User.findOne({Email}).select("+Password");

    if(!user){
        return next(new ErrorHandler("Invalid Email Id ",400));
    }

    const isPasswordMatch = await user.comparePassword(Password);
    if(!isPasswordMatch ){
        return next(new ErrorHandler("Invalid  Pasword",400))
    }
    sendToken("User Loggin SuccessFully",user,res,201)
});

//User Logout Controllers
export const logout = catchAsyncErrors((req, res, next) => { 
 res.status(201).cookie("token","",{
    expire:new Date(Date.now()),
    httpOnly:true,
 })
 .json({
    success:true,
    message:"User Logout SuccessFully",
 });
});
//User myprofile Controllers
export const myProfile = catchAsyncErrors((req, res, next) => { 
    const user =req.user;
    res.status(201).json({
       success:true,
       user, 
    });
});