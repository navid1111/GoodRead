const pool = require('../../../db')
const viewBooks=require('../query/viewBooksQuery.js')

exports.displayBookInShelf=async(req,res)=>{
    try {
        const{userId,shelfname}=req.body
        if (!userId) {
            return res.status(400).json({ error: 'userId is required' });
       }
       if(!shelfname){
           return res.status(400).json({ error: 'shelfname is required' });
       }
    const bookData=await viewBooks.displayBookInShelfQuery(userId,shelfname)
    res.json(bookData)

        
    } catch (error) {
        console.log(error)
        res.status(500).json({"error":"error occured during displaying book"})
        
    }
}
