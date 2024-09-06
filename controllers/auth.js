const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { StatusCodes } = require('http-status-codes');

exports.login = async(req, res,next) => {
   const  {email , password} = req.body
   if(!email || !password){
    return next(
        new AppError(
            'please provide email and password',
            StatusCodes.BAD_REQUEST
        )
    )
   }
   const user = await User.findOne({ email }).select('+password');

     if(!user||!(user.correctPassword(user.password,password))){
        return next(new AppError('Incorrect email or password', 401)); 
     }

     res.status(StatusCodes.OK).json({
        status:"succes",
        data:{
            user
        }
    })
  };
  
  exports.logout = (req, res,next) => {
    
  };