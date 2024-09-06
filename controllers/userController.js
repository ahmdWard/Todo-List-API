const { StatusCodes } = require('http-status-codes')
const User= require('../models/userModel')
const AppError= require('../utils/appError')
const catchAsync= require('../utils/catchAsync')
const { findByIdAndDelete } = require('../models/taskModel')



exports.getAllUser=catchAsync(async(req,res,next)=>{
    const users= await User.find()
    if(!users)
        next(new AppError('no data found'),StatusCodes.NOT_FOUND)

    res.status(StatusCodes.OK).json({
        status:"success",
        data:{
            users
        }
    })
})

exports.getUser=catchAsync(async(req,res,next)=>{
    const user= await User.find(req.params.id)
    if(!user)
        next(new AppError('no user with this ID'),StatusCodes.NOT_FOUND)

    res.status(StatusCodes.OK).json({
        status:"success",
        data:{
            user
        }
    })
})

exports.createUser=catchAsync(async(req,res,next)=>{
    const user= await User.create(req.body)

    res.status(StatusCodes.CREATED).json({
        status:"success",
        data:{
            user
        }
    })
})

exports.updateMe=catchAsync(async(req,res,next)=>{

    if (req.body.password || req.body.passwordConfirm) {
        return next(
          new AppError(
            'This route is not for password updates. Please use /updateMyPassword.',
            StatusCodes.BAD_REQUEST
          )
        );
      }
    const user= await User.findByIdAndUpdate(req.body)

    res.status(StatusCodes.OK).json({
        status:"success",
        data:{
            user
        }
    })
})


exports.deleteMe=catchAsync(async(req,res,next)=>{
    const user= await findByIdAndDelete(req.params.id)

    if(!user)
        return next(
            new AppError(
                'there is not user with this ID ,please provide an exist user',
                StatusCodes.NOT_FOUND
            ))
    res.status(StatusCodes.NO_CONTENT).json({
        status:"success",
        data:null
    })
})