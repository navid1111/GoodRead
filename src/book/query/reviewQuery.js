const pool=require('../../../db')

exports.addReviewQuery=async(userId,bookId,content)=>{
    const client= await pool.connect()

    try {
        client.query("BEGIN");
        const addReview=`Insert into Reviews (UserID,BookID,content) values ($1,$2,$3)`
        const result =await client.query(addReview,[userId,bookId,content]);
    
        await client.query('COMMIT');
        return { success: true, message: "successfully made a review" };

        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error in adding a review", error);
        throw error;
        
    }
    finally{
        client.release()
    };
}
exports.displayReviewQuery = async (bookId) => {
    const client = await pool.connect();
    try {
        const displayReview = `SELECT content FROM reviews WHERE bookid = $1`;
        const result = await client.query(displayReview, [bookId]);  // Add 'await' here

        // Check if rows exist before trying to map
        if (result.rows.length > 0) {
            const reviews = result.rows.map(row => row.content);
            return { reviews };
        } else {
            return { reviews: [] };  // Return empty array if no reviews found
        }
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error in displaying reviews", error);
        throw error;
    } finally {
        client.release();
    }
};



