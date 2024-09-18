const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt=require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const User=require('../models/userModel')
const { promisify } = require('util');

exports.protect= catchAsync(async(req,res,next)=>{

  let token; 
  if(req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
) {
    token = req.headers.authorization.split(' ')[1]
} else if(req.cookies.jwt){
    token =req.cookies.jwt
}

if(!token){
    return next(
        new AppError('you are not logged in! please log in to get acess.',StatusCodes.BAD_REQUEST)
    )
}

    const decoded= await promisify(jwt.verify)(token,process.env.JWT_SECRET);

    const currentUser= await User.findById(decoded.id)
    if(!currentUser){
        return next(
            new AppError(
              'The user belonging to this token does no longer exist.',
              StatusCodes.BAD_REQUEST
            )
          );
    }

    if(currentUser.changePasswordAfterTokenIssued(decoded.iat)){
        return next(
            new AppError(
              'User recently changed password! Please log in again.',
              StatusCodes.UNAUTHORIZED
            )
          );
    }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();

})