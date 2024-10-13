const reviewQueries =require('../query/reviewQuery')

exports.addReview=async(req,res)=>{
    try {
        const {userId,bookId,content}=req.body;
        
        if (!userId) {
             return res.status(400).json({ error: 'userId is required' });
        }
        if(!bookId){
            return res.status(400).json({ error: 'bookId is required' });
        }
        await reviewQueries.addReviewQuery(userId,bookId,content)
        res.status(200).json({"message":"review was created successfully"})
            
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal server error during creating review" });
        
    }

}
exports.showReviews= async(req,res)=>{
    try{
        const {bookId}=req.body;
        if (!bookId) {
            return res.status(400).json({ error: 'bookId is required' });
       }
      
       const reviews = await reviewQueries.displayReviewQuery(bookId)
       res.json(reviews)
    

    }
    catch(error){
        console.error(error);
        res.status(500).json({ "message": "Internal server error during displaying review" });

    }

}

