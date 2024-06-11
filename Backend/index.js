const express = require("express");

const app = express();
const db = require("./db");

const bookRoute = require('./routes/bookRoutes.js');
require("dotenv").config();



const PORT = process.env.PORT || 4000;

app.use(express.json()); // Act as (body-parser)middleWare to parsing req.body . It allows to use express to use json body.

app.get('/', (req, res) => {
    console.log(req);
    res.status(200).send("Welcome to Book-Store");
})

// Book_store routes are attained
app.use('/',bookRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
