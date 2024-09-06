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
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    timeLasted:{
        type:String
    }
})
// calc the time of each task in min 
taskSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    const docToUpdate = await this.model.findOne(this.getQuery());
    const date = parseInt((Date.now() - docToUpdate.createdAt) / 1000 / 60, 10);

    if (update.status === 'done' && docToUpdate.status !== 'done') {
        update.timeLasted = `${date} min `;
    } 
    else if (update.status === 'in progress') {
        update.$unset = update.$unset || {};
        update.$unset.timeLasted = "";
    }

    this.setUpdate(update);
    next();
});




module.exports=mongoose.model('Task',taskSchema)