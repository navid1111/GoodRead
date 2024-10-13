const express = require("express")
const router = express.Router();
const reviewcontroller = require('../controller/reviewController')


router.post('/addReview', reviewcontroller.addReview);
router.get('/showReview',reviewcontroller.showReviews);


module.exports = router;