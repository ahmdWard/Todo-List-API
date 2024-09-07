const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { StatusCodes } = require('http-status-codes');
const JWT=require('jsonwebtoken')

const signToken =id=>{
    return JWT.sign({id} ,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user,statusCode,res)=>{
    const token = signToken(user._id);
    const cookieOptions={
        expires:new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
    httpOnly:true
    }
    res.cookie('jwt', token, cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
          user
        }
      });

}

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

     if(!user||!(await user.correctPassword(password,user.password))){
        return next(new AppError('Incorrect email or password', 401)); 
     }

     createSendToken(user,StatusCodes.OK,res)
  };

  exports.signup= catchAsync(async(req,res,next)=>{
    
    const newUser= await User.create({
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,   
        role:req.body.role     
    })

    createSendToken(newUser,StatusCodes.CREATED,res)
  })
  
  exports.logout = (req, res,next) => {
    
  };

  exports.updateMyPassword=catchAsync(async(req,res,next)=>{
    const user= await User.findById(req.user.id).select('+password')

    const {currentPassword, newPassword, newPasswordConfirm}=req.body
    console.log(currentPassword)

    if(!currentPassword||!newPassword||!newPasswordConfirm)
        return next(new AppError('please provide all fields'),StatusCodes.BAD_REQUEST)

    if(!(await user.correctPassword(currentPassword,user.password))){
        return next(new AppError('Incorrect password', StatusCodes.UNAUTHORIZED)); 
    }

    user.password=newPassword
    user.passwordConfirm=newPasswordConfirm
    await user.save()

    createSendToken(user, StatusCodes.OK,res)

  })