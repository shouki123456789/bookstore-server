require('dotenv').config()
const express =require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/db')

const bookstoreServer = express()
bookstoreServer.use(cors())

bookstoreServer.use(express.json())

//use router in server app
bookstoreServer.use(router)

const PORT = 3000

bookstoreServer.listen(PORT,()=>{
    console.log('bookstore server started..... and waititng for client request!!!!');
    
})

bookstoreServer.get('/',(req,res)=>{
    res.status(200).send(`<h1>bookstore server started..... and waititng for client request!!!!</h1>`)
})