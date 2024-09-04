const app =require('./app')
const mongoose= require('mongoose')
const dotenv=require('dotenv')
dotenv.config('.env')


const url= process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASS)

mongoose.connect(url).then(()=>{
    console.log("DB is successfully connected")
})


const port= process.env.PORT || 8000

const server= app.listen(port,()=>{
    console.log(`server is running on port ${port}...`)
})