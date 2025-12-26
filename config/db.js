const mongoose = require('mongoose')

const connectionString = process.env.databaseURL

mongoose.connect(connectionString).then(res=>{
    console.log('mongoDB atlas database connected successfully');
    
}).catch(error=>{
    console.log('database connection failed!!!');
    console.log(error);
    
    
})