const sequelize = require("../config/database");
const User = require("./user");
const Book = require("./book");
const Review = require("./review");

Book.hasMany(Review, { foreignKey: "bookId", as: "reviews" });
Review.belongsTo(Book, { foreignKey: "bookId", as: "book" });

module.exports = { sequelize, User, Book, Review };
