const mongoose =require("mongoose");
require("dotenv").config();

const mongoURl = process.env.mongoURl;

mongoose.connect(mongoURl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // socketTimeoutMS: 20000, // 20 seconds
  })
.then(()=>{
        console.log("App Connected to database");
}).catch((err)=>{
        console.log(err);
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Connection is establish to MongoDB server.");
})

db.on('error',(err)=>{
    console.log("MongoDB connection error.", err);
})

db.on('disconnected',()=>{
    console.log("Disconnected from MongoDB server.");
})

module.exports = db;
