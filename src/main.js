const dotenv = require("dotenv");
const express = require("express");

const { Book } = require("./model/Book");
const { BookService } = require("./service/BookService");

const app = express();
app.use(express.json());

dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;
const book_store_name = process.env.BOOK_STORE_NAME;
const redis_host = process.env.REDIS_HOST;
const redis_port = process.env.REDIS_PORT;

// let bookService = new BookService(book_store_name);
let bookService = new BookService(book_store_name, redis_host, redis_port);

console.log(`host=${host}, port=${port}`);

app.get("/", (req, res) => {
  res.send(`Book Store Service Online. Now is ${new Date().toLocaleString()}`);
});

app.get("/getAll", async (_, res) => {
  let bookList = await bookService.getAll();
  res.json(bookList);
});

app.get("/getById/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let book = await bookService.getById(id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Not found");
  }
});

app.post("/create", async (req, res) => {
  let book = Book.fromObject(req.body);
  let result = await bookService.create(book);
  res.json(result);
});

app.post("/update/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let book = Book.fromObject(req.body);
  let result = await bookService.update(id, book);
  res.json(result);
});

app.get("/delete/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await bookService.delete(id);
  res.json(result);
});

app.listen(port, host, () => {
  console.log(
    `Book Store Service listening on port ${port}. Visit http://localhost:${port}`
  );
});
