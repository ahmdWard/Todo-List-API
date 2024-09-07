const mongoose= require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        required:[true,'please provide your password'],
        select:false
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
    passwordChangedAt:Date,
    active:{
        type:Boolean,
        default:true,
        select:false
    }
})


userSchema.pre('save', async function(){
    if (!this.isModified('password')) return next();

    this.password= await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined
})


userSchema.methods.correctPassword = async function
 (userPassword,candidatePassword){
    return await bcrypt.compare(userPassword,candidatePassword)
}


userSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });
  
module.exports=mongoose.model('User',userSchema)