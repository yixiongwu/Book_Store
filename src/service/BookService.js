"use strict";
// Import the Book class
const { Book } = require("../model/Book");
// const {
//   getAll,
//   getById,
//   create,
//   update,
//   deleteById,
// } = require("../database/file.db");

const {
  init,
  getAll,
  getById,
  create,
  update,
  deleteById,
} = require("../database/redis.db");

// Book Service contains the operations to Book Model
class BookService {
  // constructor(book_store_name) {
  //   this.book_store_name = book_store_name+".json";
  // }
  constructor(book_store_name, host, port) {
    this.book_store_name = book_store_name;
    init(host, port);
  }

  // Get all book list
  getAll() {
    return getAll(this.book_store_name);
  }
  // Get the book from the book list through the book's id, if it is not exist then return 404[not found]
  getById(id) {
    if (typeof id !== "number") {
      throw new Error("argument id error");
    }
    return getById(this.book_store_name, id);
  }
  // Create a new book
  create(book) {
    if (!book || !(book instanceof Book)) {
      throw new Error("argument book error");
    }
    return create(this.book_store_name, book);
  }
  // Update a exist book
  update(id, book) {
    if (typeof id !== "number") {
      throw new Error("argument id error");
    }
    if (!book || !(book instanceof Book)) {
      throw new Error("argument book error");
    }
    return update(this.book_store_name, id, book);
  }
  // Delete a exist book
  delete(id) {
    if (!id || typeof id !== "number") {
      throw new Error("argument id error");
    }
    return deleteById(this.book_store_name, id);
  }
}

module.exports = { BookService };
