

//register
exports.registerController = (req,res)=>{
    console.log("inside register controller");
    const {username,email,password} = req.body
    console.log(username,email,password);
    
    res.status(200).json("request recieved")
    
}
//login
//user profile edit
//admin profile edit