const pool=require('../../../db')

exports.displayprofileQuery=async(userId)=>{
    const client= await pool.connect();

    

    try {
        const displayuserprofileQuery=`SELECT username,email from users where userId = $1`
        const displaySuggestedBooks=`SELECT title 
FROM books 
WHERE bookid IN (
    SELECT bookid 
    FROM bookgenre 
    WHERE genreid IN (
        SELECT genreid 
        FROM favgenre 
        WHERE userid = $1
    )
);`
        await client.query('BEGIN')
        const userResult=await client.query(displayuserprofileQuery,[userId])
        const userInfo = userResult.rows.map(row => ({
            username: row.username,
            email: row.email
        }));
        const bookgenreResult=await client.query(displaySuggestedBooks,[userId])
        const recommendedBooks = bookgenreResult.rows.map(row => row.title);

        return{
            userInfo,
            recommendedBooks
        }

        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error in profilequery", error);
        throw error;
    } finally {
        client.release();
    }


}
