const express = require("express");
const router = express.Router();

const Book = require('../models/book.js');

// Route to save a new book

router.post('/book', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }
        const newBookData = req.body;
        const newBook = new Book(newBookData);
        const response = await newBook.save();

        console.log("New book Saved");
        res.status(201).send(response);

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ Error: "Internal server error" });
    }
})

// Route to get books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find({});
        console.log("Books are Displayed");
        res.status(200).json({
            count: books.length,
            data: books,
        }); // Shape/structure the output of this route

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
})

// Route to get a single book.
router.get('/book/:id', async (req, res) => {
    try {
        const { id } = req.params; // deStructureing req.params id
        const book = await Book.findById(id);

        console.log("Single-book is Displayed");
        res.status(200).json(book);

    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message });
    }
})

// Route for update a book.
router.put('/book/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        console.log("Book is updated");
        res.status(200).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
})

// Route for delete a book
router.delete('/book/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            res.status(404).json({ message: "Book not found" });
        }
        console.log("Book is deleted");
        return res.status(200).send({ message: "Book deleted successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    }
})

module.exports = router;