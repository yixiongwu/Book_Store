"use strict";

let fs = require("fs");

function readFile(fileName) {
  if (fs.existsSync(fileName)) {
    let json = fs.readFileSync(fileName);
    return JSON.parse(json);
  }
  return [];
}

function writeFile(fileName, books) {
  let json = JSON.stringify(books);
  // overwrite
  return fs.writeFileSync(fileName, json);
}

function getAll(fileName) {
  return readFile(fileName);
}

function getById(fileName, id) {
  let books = readFile(fileName);
  return books.find((it) => it.id === id);
}

function create(fileName, book) {
  let books = readFile(fileName);
  books.push(book);
  writeFile(fileName, books);
  return true;
}

function update(fileName, id, book) {
  let books = readFile(fileName);
  let existBook = books.find((it) => it.id === id);
  if (existBook) {
    existBook.title = book.title;
    existBook.author = book.author;
    existBook.price = book.price;
    writeFile(fileName, books);
    return true;
  }
  return false;
}

function deleteById(fileName, id) {
  let books = readFile(fileName);
  let indexToDelete = books.findIndex((it) => it.id === id);
  if (indexToDelete != -1) {
    books.splice(indexToDelete, 1);
    writeFile(fileName, books);
    return true;
  }
  return false;
}

module.exports = { getAll, getById, create, update, deleteById };
