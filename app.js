const express = require('express')
const globalErrorHandler= require('./controllers/errorController')
const taskRouter= require('./routes/taskRouter')
const userRouter= require('./routes/userRouter')
const app= express()

app.use(express.json())

app.use((req,res,next)=>{
    req.resposetime= new Date().toISOString()
    console.log(req.resposetime)
    next()
})

app.use('/api/v1/tasks',taskRouter)
// app.use('/api/v1/users',userRouter)

app.use(globalErrorHandler)
module.exports=app