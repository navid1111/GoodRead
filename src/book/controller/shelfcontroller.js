const shelfQueries =require('../query/addToShelfQuery')

exports.addShelf=async(req,res)=>{
    try {
        const {userID,shelfname}=req.body;
        
        if (!userID) {
             return res.status(400).json({ error: 'userId is required' });
        }
        if(!shelfname){
            return res.status(400).json({ error: 'shelfname is required' });
        }
        await shelfQueries.createShelf(userID,shelfname)
        res.status(200).json({"message":"shelf was created successfully"})
            
        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal server error during creating shelf" });
        
    }

}
exports.addBookToShelf= async(req,res)=>{
    try{
        const {bookname,shelfname,userID}=req.body;
        if (!userID) {
            return res.status(400).json({ error: 'userId is required' });
       }
       if(!shelfname){
           return res.status(400).json({ error: 'shelfname is required' });
       }
       if(!bookname){
        return res.status(400).json({ error: 'bookname is required' });

       }
       await shelfQueries.addBooktoShelf(bookname,shelfname,userID)
       res.status(200).json({"message":"book added to shelf successfully"})

    }
    catch(error){
        console.error(error);
        res.status(500).json({ "message": "Internal server error during adding book to shelf" });

    }

}

