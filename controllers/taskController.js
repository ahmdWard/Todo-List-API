const Task= require('../models/taskModel')
const AppError= require('../utils/appError')
const catchAsync= require('../utils/catchAsync')
const {StatusCodes}= require('http-status-codes')

exports.getAllTasks=catchAsync(async(req,res,next)=>{

    const tasks= await Task.find()
    if(!tasks||!tasks.length){
        return next(new AppError(`there is not any data found`),404)
    }
    res.status(StatusCodes.OK).json({
        status:"succes",
        length:tasks.length,
        data:{
            tasks
        }
    })
})

exports.createTask =catchAsync(async(req,res,next)=>{

    const task = await Task.create(req.body)
    res.status(StatusCodes.CREATED).json({
        status:'succes',
        data:{
            task
        }
    })
})