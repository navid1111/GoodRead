const pool = require('../../../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authquery = require('../query/authquery.js')

exports.register = async (req, res) => {
    try {
        const { username, email, password, fav_genre } = req.body;
        
        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Call registration query
        await authquery.registrationQuery(username, email, hashedPassword, fav_genre);
        res.status(200).json({"message":"registration successfull"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ "message": "Internal server error during registration" });
    }
}
exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await authquery.isvalidUserQuery(email);
        if(!user){
            res.status(400).json({"message":"wrong credentials"})
        }
        const isMatchedPassword=await bcrypt.compare(password,user.password)
        if (!isMatchedPassword) {
            return res.status(400).json({ error: 'Invalid email or password' });
          }
          if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        
        const token = jwt.sign(
            { userId: user.userId, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

      
        res.status(200).json({"message":"login was successful"})
    

    }
    catch(error){
        console.log(error);
        res.status(500).json({"error":"error occured during login"})

    }
}
