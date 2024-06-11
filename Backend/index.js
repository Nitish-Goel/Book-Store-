const express = require("express");

const app = express();
const db = require("./db");

const bookRoute = require('./routes/bookRoutes.js');
const cors = require('cors');

require("dotenv").config();



const PORT = process.env.PORT || 4000;

app.use(express.json()); // Act as (body-parser)middleWare to parsing req.body . It allows to use express to use json body.

// MiddleWare for handling CORS policy
// CORS stand for : Cross-origin resource sharing 
// Opt(1): Allow all origins with default of cors(*).
// app.use(cors());

// Opt(2): Allow custom origins of cors.
app.use(
    cors({
        origin: 'http://localhost:3000', // Now the client with this origin can access this server
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);


app.get('/', (req, res) => {
    console.log(req);
    res.status(200).send("Welcome to Book-Store");
})

// Book_store routes are attained
app.use('/', bookRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
