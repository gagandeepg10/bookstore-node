const express = require("express");
const ReviewController = require("../controllers/reviewController");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/books/:bookId", ReviewController.getBookReviews);

router.post(
  "/books/:bookId",
  authenticateToken,
  ReviewController.addOrModifyReview
);

router.delete(
  "/books/:bookId",
  authenticateToken,
  ReviewController.deleteReview
);

module.exports = router;
