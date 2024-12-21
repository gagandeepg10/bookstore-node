const express = require("express");
const BookController = require("../controllers/bookController");
const router = express.Router();

router.get("/", BookController.getAllBooksAsyncCallback);
router.get("/isbn/:isbn", BookController.getBookByISBN);
router.get("/author/:author", BookController.getBooksByAuthor);
router.get("/title/:title", BookController.getBooksByTitle);
router.get("/", BookController.getAllBooksAsyncCallback);
router.get("/promises/isbn/:isbn", BookController.getBookByISBNUsingPromises);
router.get("/search/author", BookController.searchBooksByAuthor);
router.get("/search/title", BookController.searchBooksByTitle);

module.exports = router;
