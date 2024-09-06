const express= require('express')
const authController= require('../controllers/auth')
const userController= require('../controllers/userController')


const router=express.Router()


router.post('/login',authController.login)

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