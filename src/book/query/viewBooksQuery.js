const pool=require('../../../db')

exports.displayBookInShelfQuery= async(userId,shelfname)=>{
    const client=await pool.connect()

    try {
        const displayBookInShelfQuery = `
    SELECT title, Author 
    FROM books 
    WHERE BookID IN (
        SELECT BookId 
        FROM bookshelf 
        WHERE shelfId = (
            SELECT ShelfId 
            FROM shelves 
            WHERE userid = $1 AND name = $2
        )
    )
`;

        const booksInShelfResult=await client.query(displayBookInShelfQuery,[userId,shelfname])
        const books = booksInShelfResult.rows.map(row => row.title);
        
        return{
            books
        }
    }
    catch(error){
        await client.query('ROLLBACK');
        console.log("error");
        
        // return res.status(400).json({"error":"error occured during displayBookInShelfQuery"})
        throw error;

    }
    finally{
        client.release()
    }


}