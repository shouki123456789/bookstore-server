
const users = require('../models/userModel')
const jwt = require('jsonwebtoken')



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
exports.loginController = async(req,res)=>{
    console.log("inside login controller");
    const {email,password}=req.body
    try{
        
        const existingUser = await users.findOne({email})
        
        if(existingUser){
            
            if(password == existingUser.password){
                
                const tocken = jwt.sign({userMail:existingUser.email, role:existingUser.role},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,tocken})

            }else{
                
                res.status(401).json("incorrect Password/ Email !!!")
            }

        }else{
            
            res.status(404).json("Account Does not exist")
        }
        

    }catch(error){
    
        console.log(error);
        res.status(500).json(error)
    
    }
    
}



//user profile edit
//admin profile edit