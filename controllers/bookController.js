const { Book } = require("../models");

exports.getBookByISBN = async (req, res) => {
  try {
    const { isbn } = req.params;
    const book = await Book.findOne({ where: { isbn: isbn } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.params;
    const books = await Book.findAll({ where: { author: author } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBooksByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const books = await Book.findAll({ where: { title: title } });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBooksAsyncCallback = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBookByISBNUsingPromises = (req, res) => {
  const { isbn } = req.params;
  Book.findOne({ where: { isbn } })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      res.json(book);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.searchBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.query;
    const books = await Book.findAll({ where: { author: author } });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchBooksByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const books = await Book.findAll({ where: { title: title } });
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
