const mongoose= require('mongoose')
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto=require('crypto')

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
                return el===this.password
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
    },
    passwordResetToken:String,
    passwordResetExpires:Date
})


userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();

    this.password= await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined
})

userSchema.pre('save',function (next){
  if(!this.isModified('password')||this.isNew) return next()

  this.passwordChangedAt=Date.now() -1000
  next()
})



userSchema.pre(/^find/, function(next) {
    // this points to the current query
    this.find({ active: { $ne: false } });
    next();
  });
  


userSchema.methods.changePasswordAfterTokenIssued= function(JWTTIMESTAMP){


    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
          );
        
          return JWTTIMESTAMP <changedTimestamp
    }
    return false
}


userSchema.methods.correctPassword = async function
(candidatePassword,userPassword){
   return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.createResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(32).toString('hex')
    console.log(resetToken)
    this.passwordResetToken= crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log(this.passwordResetToken)
    
    this.passwordResetExpires=Date.now() + 10*60*1000
    return resetToken

}


module.exports=mongoose.model('User',userSchema)