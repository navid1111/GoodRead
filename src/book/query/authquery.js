const { password } = require('pg/lib/defaults');
const pool = require('../../../db');

exports.registrationQuery = async (username, email, password, fav_genre) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');

        // User registration query
        const userRegQuery = `
            INSERT INTO Users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING UserID
        `;
        const userResult = await client.query(userRegQuery, [username, email, password]);
        const userId = userResult.rows[0].userid;

        // Favorite genre insertion query
        const favGenreInsertQuery = `
            INSERT INTO FavGenre (UserID, GenreID)
            VALUES ($1, (SELECT GenreID FROM Genres WHERE GenreName = $2))
        `;
        await client.query(favGenreInsertQuery, [userId, fav_genre]);

        await client.query('COMMIT');
        return { success: true, message: "Registration and genre assignment successful" };
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error in registration query", error);
        throw error;
    } finally {
        client.release();
    }
};
exports.isvalidUserQuery=async(email)=>{
    const client=await pool.connect();
   try {
    client.query('BEGIN')
    const findUserQuery=`Select * from Users where email=$1`
    const user=await client.query(findUserQuery,[email]);
   
        return user.rows[0];
    
    
   } catch (error) {
    await client.query('ROLLBACK');
    console.error("Error in login query", error);
    throw error;
    

    
   }
finally {
    client.release();
}

}