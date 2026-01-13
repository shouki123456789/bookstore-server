const books = require('../models/bookModel')
const stripe = require('stripe')(process.env.STRIPESECRET);

//add book
exports.addBookController = async(req,res)=>{
    console.log("inside adBookController");
    const {title,author,pages,imageURL,price,discountPrice,abstract,
           publisher,language,isbn,category} = req.body

    const uploadImg = req.files.map(item=>item.filename)
    const sellerMail = req.payload

    console.log(title,author,pages,imageURL,price,discountPrice,abstract,
     publisher,language,isbn,category,uploadImg,sellerMail);
  
    try{
        const existingBook = await books.findOne({title,sellerMail})
        if(existingBook){
            res.status(409).json("Book Already exists!!!! Request failed....")
        }else{
            const newBook = await books.create({title,author,pages,
                imageURL,price,discountPrice,abstract,
                publisher,language,isbn,category,uploadImg,sellerMail
            })
            res.status(200).json(newBook)
        }

    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }

    
}

// get homepage books
exports.getHomeBookController = async (req,res)=>{
    console.log("inside getHomeBookController");
    try{
        const homeBooks = await books.find().sort({_id:-1}).limit(4)
         res.status(200).json(homeBooks)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    
   
}



//get all books - for authorised user(exept his own book)

exports.getUserAllBooksController =async (req,res)=>{
    console.log("inside getUserAllbooksController");
     const searchKey = req.query.search
     console.log(searchKey);
     

    const loginUserMail = req.payload
    try{
       const allBooks = await books.find({sellerMail:{$ne:loginUserMail},title:{$regex:searchKey,$options:'i'}})
       res.status(200).json(allBooks)
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
    
}



//get userupload books-authorised user(for book status component in profile)

exports.getUserProfileBooksController = async(req,res) =>{
    console.log("inside getUserProfileBooksController");
    const loginUserMail =req.payload
    try{
        const userBooks = await books.find({sellerMail:loginUserMail})
        res.status(200).json(userBooks)

    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    

}


//purchase
exports.getUserBoughtBooksController = async(req,res) =>{
    console.log("inside getUserUploadProfileBooksController");
    const loginUserMail =req.payload
    try{
        const userBooks = await books.find({buyerMail:loginUserMail})
        res.status(200).json(userBooks)

    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    

}

//get a single book details for view page

exports.viewBookController = async (req,res)=>{
    console.log("inside viewBookController");
    const{id} = req.params
    try{
        const userBooks = await books.findById({_id:id})
        res.status(200).json(userBooks)

    }catch(error){
        console.log(error);
       !res.status(500).json

    }
    
    
}



//get all book admin:collections

exports.getAllBookController = async(req,res)=>{
    console.log('inside getAllBookController');
    try{
        const allBooks = await books.find()
        res.status(200).json(allBooks)

    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }
    

}

///update bookstatus
exports.updateBookStatusController = async(req,res)=>{
    console.log("inside updateBookStatusController")
    const {id} = req.params
    try{
        const updateBook = await books.findById({_id:id})
        updateBook.status = "approved"
        await updateBook.save()
        res.status(200).json(updateBook)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }

}

// delete book userprofile->book status
exports.deleteBookController = async(req,res)=>{
    console.log("inside deleteBookController");
    const {id} = req.params
    try{
        const bookDetails = await books.findByIdAndDelete({_id:id})
        
        res.status(200).json(bookDetails)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }

}

// payment controller
exports.bookPaymentController = async(req,res)=>{
    console.log("inside bookPaymentController");
    const {id} = req.params
    const email = req.payload
    try{
        
         const bookDetails = await books.findById({_id:id})

         bookDetails.status ="sold"
         bookDetails.buyerMail = email
         await bookDetails.save()

         const line_items = [{
            price_data:{
                currency: 'usd',
                 product_data: {
                    name:bookDetails.title,

                    description:`${bookDetails.author} | ${bookDetails.publisher}`,
                    images:bookDetails.uploadImg,
                   metadata:{
                        title:bookDetails.title,author:bookDetails.author,imageURL:bookDetails.imageURL,price:bookDetails.price
                    }
                },
                unit_amount:Math.round(bookDetails.discountPrice*100)
            },
            quantity:1
         }]

        const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],

        line_items,
        mode: 'payment',
        success_url: 'http://localhost:5173/payment-success',
        cancel_url:"http://localhost:5173/payment-failure"
        
});

        console.log(session.url);
        
        res.status(200).json({checkoutURL:session.url})
    }catch(error){
        console.log(error);
        res.status(500).json(error)
        
    }

}