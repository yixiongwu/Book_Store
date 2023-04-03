"use strict";
// Import the Book class
const { Book } = require("../model/Book");
const {
  BookDataBase,
  getAll,
  getById,
  create,
  update,
  deleteById,
} = require("../database/file.db");

// Book Service contains the operations to Book Model
class BookService {
  constructor() {}
  // Get all book list
  getAll() {
    return getAll(BookDataBase);
  }
  // Get the book from the book list through the book's id, if it is not exist then return 404[not found]
  getById(id) {
    if (typeof id !== "number") {
      throw new Error("argument id error");
    }
    return getById(BookDataBase, id);
  }
  // Create a new book
  create(book) {
    if (!book || !(book instanceof Book)) {
      throw new Error("argument book error");
    }
    return create(BookDataBase, book);
  }
  // Update a exist book
  update(id, book) {
    if (typeof id !== "number") {
      throw new Error("argument id error");
    }
    if (!book || !(book instanceof Book)) {
      throw new Error("argument book error");
    }
    return update(BookDataBase, id, book);
  }
  // Delete a exist book
  delete(id) {
    if (!id || typeof id !== "number") {
      throw new Error("argument id error");
    }
    return deleteById(BookDataBase, id);
  }
}

module.exports = { BookService };
