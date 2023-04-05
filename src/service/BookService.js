"use strict";
// Import the Book class
const { Book } = require("../model/Book");
const {
  getAll,
  getById,
  create,
  update,
  deleteById,
} = require("../database/file.db");

// Book Service contains the operations to Book Model
class BookService {
  constructor(book_file_name) {
    this.BOOK_FILE_NAME =book_file_name
  }
  // Get all book list
  getAll() {
    return getAll(this.BOOK_FILE_NAME);
  }
  // Get the book from the book list through the book's id, if it is not exist then return 404[not found]
  getById(id) {
    if (typeof id !== "number") {
      throw new Error("argument id error");
    }
    return getById(this.BOOK_FILE_NAME, id);
  }
  // Create a new book
  create(book) {
    if (!book || !(book instanceof Book)) {
      throw new Error("argument book error");
    }
    return create(this.BOOK_FILE_NAME, book);
  }
  // Update a exist book
  update(id, book) {
    if (typeof id !== "number") {
      throw new Error("argument id error");
    }
    if (!book || !(book instanceof Book)) {
      throw new Error("argument book error");
    }
    return update(this.BOOK_FILE_NAME, id, book);
  }
  // Delete a exist book
  delete(id) {
    if (!id || typeof id !== "number") {
      throw new Error("argument id error");
    }
    return deleteById(this.BOOK_FILE_NAME, id);
  }
}

module.exports = { BookService };
