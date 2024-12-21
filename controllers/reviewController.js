const { Review } = require("../models");

exports.getBookReviews = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.findAll({ where: { bookId: bookId } });
    if (reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this book" });
    }
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addOrModifyReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;
    const { reviewText } = req.body;

    const existingReview = await Review.findOne({
      where: { bookId: bookId, userId: userId },
    });

    if (existingReview) {
      existingReview.reviewText = reviewText;
      await existingReview.save();
      return res.json({
        message: "Review updated successfully",
        review: existingReview,
      });
    }

    // Add new review
    const newReview = await Review.create({
      bookId,
      userId,
      reviewText,
    });

    res
      .status(200)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const review = await Review.findOne({
      where: { bookId: bookId, userId: userId },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await review.destroy();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
