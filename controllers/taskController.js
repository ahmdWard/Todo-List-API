const {StatusCodes}= require('http-status-codes')
const Task= require('../models/taskModel')
const AppError= require('../utils/appError')
const catchAsync= require('../utils/catchAsync')
const APIFeatures=require('../utils/apiFeatures')



exports.getAllTasks=catchAsync(async(req,res,next)=>{

    const filter ={}        
    const features = new APIFeatures(Task.find(filter),req.query)
    .filter()
    .sort()
    .pagination()

    const tasks= await features.query.exec()


    if(!tasks||!tasks.length){
       return next(new AppError(`there is not any data found`),StatusCodes.NOT_FOUND)
    }
    res.status(StatusCodes.OK).json({
        status:"succes",
        length:tasks.length,
        data:{
            tasks
        }
    })
})

exports.getTask= catchAsync(async(req,res,next)=>{

    const task = await Task.findById(req.params.id)

    if(!task)
         next(new AppError('this Id is not valid',StatusCodes.NOT_FOUND))

    res.status(StatusCodes.OK).json({
        status:'succes',
        data:{
            task
        }
    })
})

exports.updateTask= catchAsync(async(req,res,next)=>{

    const modefiedTask = await Task.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })
    if(!modefiedTask){
        return next(new AppError('this id is not valid',StatusCodes.NOT_FOUND))
    }
    res.status(StatusCodes.OK).json({
        status:'succes',
        data:{
            modefiedTask
        }
    })
})


exports.deleteTask =catchAsync(async(req,res,next)=>{
    
      const task = await Task.findByIdAndDelete(req.params.id)
      if(!task)
        return next(new AppError('this id is not valid',StatusCodes.NOT_FOUND))

      res.status(StatusCodes.NO_CONTENT).json({
        status:"succes",
        data:null
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