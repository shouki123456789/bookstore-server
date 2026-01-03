const books = require('../models/bookModel')



exports.addBookController = async(req,res)=>{
    console.log("inside adBookController");
    res.status(200).json("addbook request recieved")
    
}