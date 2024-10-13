const express=require('express')
const router=express.Router()
const shefController=require('../controller/shelfcontroller')

router.post('/addShelf',shefController.addShelf)
router.post('/addBook',shefController.addBookToShelf)

module.exports=router;
