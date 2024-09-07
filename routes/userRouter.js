const express= require('express')
const authController= require('../controllers/auth')
const userController= require('../controllers/userController')
const check=require('../middlewares/authMiddleWare')

const router=express.Router()


router.post('/login',authController.login)
router.post('/signup',authController.signup)


router.use(check.protect)


router.patch('/updatePassword',authController.updateMyPassword)
router.post('/forgetPassword',authController.forgetPassword)
router.post('/resetPassword/:token',authController.resetPassword)


router
.route('/')
.post(userController.createUser)
.get(userController.getAllUser)

router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateMe)
.delete(userController.deleteMe)


module.exports=router