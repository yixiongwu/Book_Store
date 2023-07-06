"use strict";

const Redis = require("ioredis");

let redis = null;

function init(host, port) {
  redis = new Redis(port, host);
}

async function getAll(book_key) {
  let obj = await redis.hgetall(book_key);
  let arr = [];
  for (let property in obj) {
    let json = obj[property];
    arr.push(JSON.parse(json));
  }
  return arr;
}

async function getById(book_key, id) {
  let json = await redis.hget(book_key, id);
  if (json) {
    return JSON.parse(json);
  }
  return null;
}

async function create(book_key, book) {
  let json = JSON.stringify(book);
  await redis.hset(book_key, book.id, json);
  return true;
}

async function update(book_key, id, book) {
  let exist = await redis.hexists(book_key, id);
  if (exist) {
    let json = await redis.hget(book_key, id);
    let existBook = JSON.parse(json);
    existBook.title = book.title;
    existBook.author = book.author;
    existBook.price = book.price;
    json = JSON.stringify(existBook);
    await redis.hset(book_key, id, json);
    return true;
  }
  return false;
}

function deleteById(book_key, id) {
  let exist = redis.hexists(book_key, id);
  if (exist) {
    redis.hdel(book_key, id);
    return true;
  }
  return false;
}

module.exports = {
  init,
  getAll,
  getById,
  create,
  update,
  deleteById,
};
