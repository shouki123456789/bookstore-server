
const users = require('../models/userModel')
//register
exports.registerController = async (req,res)=>{
    console.log("inside register controller");
    const {username,email,password} = req.body
   
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("user already exist!!! please login...")
        }else{
            const newUser = await users.create({
                username,email,password
            })
            res.status(200).json(newUser)
        }

    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
   // res.status(200).json("request recieved")
    
}
//login
//user profile edit
//admin profile edit