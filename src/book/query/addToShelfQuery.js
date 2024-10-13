const pool=require('../../../db')

exports.createShelf=async(userId,shelfname)=>{
    const client= await pool.connect()

    try {
        client.query("BEGIN");
        const createShelfForUser=`Insert into shelves (UserID,name) values ($1,$2)`
        const result =await client.query(createShelfForUser,[userId,shelfname]);
        await client.query('COMMIT');
        return { success: true, message: "successfully created a shelf" };

        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error in creating shelf query", error);
        throw error;
        
    }
    finally{
        client.release()
    };
}
exports.addBooktoShelf= async(bookname,shelfname,userId)=>{
    const client = await pool.connect()
    try {
    const addBooktoShelfQuery=`Insert into BookShelf (BookID,ShelfID) values ((select BookID from books where title =$1),(select shelfID from shelves where name= $2 and UserID=$3) )`
    const result=client.query(addBooktoShelfQuery,[bookname,shelfname,userId])
    client.query('COMMIT')
    return { success: true, message: "successfully book was added to a shelf" };

        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error in adding book to self", error);
        throw error;
        
    }
    finally{
        client.release()
    }
    
}



