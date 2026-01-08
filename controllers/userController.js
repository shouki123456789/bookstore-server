
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
                
                const token = jwt.sign({userMail:existingUser.email, role:existingUser.role},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})

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

//google login
exports.googleLoginController = async(req,res)=>{
    console.log("inside login googleLogincontroller");
    const {email,password,username,picture} = req.body
    try{
        
        const existingUser = await users.findOne({email})
        if(existingUser){
           
                
                const token = jwt.sign({userMail:existingUser.email, role:existingUser.role},process.env.JWTSECRET)
                res.status(200).json({user:existingUser,token})
        }else{
            
                const newUser = await users.create({
                username,email,password,picture
            })

            const token = jwt.sign({userMail:newUser.email, role:newUser.role},process.env.JWTSECRET)
                res.status(200).json({user:newUser,token})
        }
        

    }catch(error){
    
        console.log(error);
        res.status(500).json(error)
    
    }
    
}


//user profile edit

exports.userProfileUpdateController = async(req,res)=>{
    const email = req.payload
    const {id}  = req.params
    const {username,password,bio,role,picture} = req.body
    const updatePicture =req.file?req.file.filename:picture
    
    
    console.log(id,email,username,password,bio,role,updatePicture);
    
    try{
        const updateUser =   await users.findByIdAndUpdate({_id:id},{username,email,password,picture:updatePicture,bio,role},
            {new:true}
        )
        res.status(200).json(updateUser)

    }catch(error) {
        console.log(error);
        res.status(500).json(error)

    }
   
   
}


//admin profile edit