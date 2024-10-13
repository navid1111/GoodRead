const express = require('express')
const profileController=require('../controller/profilecontroller.js')
const router=express.Router()

router.get('/userProfile',profileController.showProfile)

module.exports=router;