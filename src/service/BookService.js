"use strict";
const { Book } = require("../model/Book");

class BookService {
  constructor() {
    this.BookList = [];
  }
  getAll() {
    return this.BookList;
  }
  getById(id) {
    console.log(typeof id !== "number");
    if (typeof id !== "number") {
      throw new Error("argument id error");
    }
    return this.BookList.find((it) => it.id === id);
  }
  create(book) {
    if (!book || !(book instanceof Book)) {
      throw new Error("argument book error");
    }
    this.BookList.push(book);
    return true;
  }
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
