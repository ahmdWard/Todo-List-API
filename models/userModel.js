const mongoose= require('mongoose')
const validator = require('validator');

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'please provide your username']
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:"user"
    },
    password:{
        type:String,
        minlength:[10,'password should be at least 10 characters'],
        required:[true,'please provide your password']
    },
    passwordConfirm:{
        type:String,
        required:[true,'please confirm your Password '],
        validate:{
            validator:function(el){
                return el=this.password
            },
            message: 'Passwords are not the same!'

        }
    },
    email:{
        type:String,
        required:[true,'please provide you email'],
        unique:[true,'this email is used before'],
        validate:[validator.isEmail,'please provide a valid email']
    },
    active:{
        type:Boolean,
        default:true,
        select:false
    }

})

module.exports=mongoose.model('User',userSchema)