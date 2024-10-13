const express = require('express')
const displayBookController=require('../controller/displayBookController.js')
const router=express.Router()

router.get('/bookInShelf',displayBookController.displayBookInShelf)


module.exports=router;