const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    author: {
        type: String,
        default:"unknown",
        required: true
    },
    language:{
        type: String
    },
    pages:{
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
}
);

const Books = mongoose.model("books", bookSchema);

module.exports = Books;