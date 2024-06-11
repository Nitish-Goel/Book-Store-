const express = require("express");

const app = express();
const db = require("./db");
const Book = require('./models/book');

require("dotenv").config();



const PORT = process.env.PORT  || 4000;

app.use(express.json()); // Act as (body-parser)middleWare to parsing req.body . It allows to use express to use json body.

app.get('/',(req ,res)=>{
    console.log(req);
    res.status(200).send("Welcome to Book-Store");
})

// Route to save a new book

app.post('/book',async (req,res)=>{
try{
    if(!req.body.title || !req.body.author || !req.body.publishYear ){
        return res.status(400).send({
            message:"Send all required fields: title, author, publishYear",
        });
    }
    const newBookData = req.body;
    const newBook = new Book(newBookData);
    const response = await newBook.save();

    console.log("New book Saved");
    res.status(201).send(response);

}catch(err){
    console.log(err.message);
    res.status(500).json({Error:"Internal server error"});
}
})

// Route to save a new book
app.get('/book',async (req, res)=>{
    try{    
        const book = await Book.find({});
        console.log("Books are Displayed");
        res.status(200).json(book);
        
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
})

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});
