const express = require('express')

const app= express()

app.use(express.json())

app.use((req,res,next)=>{
    req.resposetime= new Date().toISOString()
    console.log(req.resposetime)
    next()
})

module.exports=app