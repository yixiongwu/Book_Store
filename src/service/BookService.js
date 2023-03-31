"use strict";
// Import the Book class
const { Book } = require("../model/Book");

// Book Service contains the operations to Book Model
class BookService {
  constructor() {
    this.BookList = [];
  }
  // Get all book list
  getAll() {
    return this.BookList;
  }
  // Get the book from the book list through the book's id, if it is not exist then return 404[not found]
  getById(id) {
    console.log(typeof id !== "number");
    if (typeof id !== "number") {
      throw new Error("argument id error");
    }
    return this.BookList.find((it) => it.id === id);
  }
  // Create a new book
  create(book) {
    if (!book || !(book instanceof Book)) {
      throw new Error("argument book error");
    }
    this.BookList.push(book);
    return true;
  }
  // Update a exist book
  update(id, book) {
    if (typeof id !== "number") {
      throw new Error("argument id error");
    }
    if (!book || !(book instanceof Book)) {
      throw new Error("argument book error");
    }
    let existBook = this.BookList.find((it) => it.id === id);
    if (existBook) {
      existBook.title = book.title;
      existBook.author = book.author;
      existBook.price = book.price;
      return true;
    }
    return false;
  }
  // Delete a exist book
  delete(id) {
    if (!id || typeof id !== "number") {
      throw new Error("argument id error");
    }
    let indexToDelete = this.BookList.findIndex((it) => it.id === id);
    if (indexToDelete != -1) {
      this.BookList.splice(indexToDelete, 1);
      return true;
    }
    return false;
  }
}

module.exports = { BookService };
