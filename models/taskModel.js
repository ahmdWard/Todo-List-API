const mongoose = require('mongoose')

const taskSchema= new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please write a title for the task"]
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:['done','in progress'],
        default:"in progress"
    }
})


module.exports=mongoose.model('Task',taskSchema)