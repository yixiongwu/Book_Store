const dotenv = require("dotenv");
const express = require("express");

const { Book } = require("./model/Book");
const { BookService } = require("./service/BookService");

const app = express();
app.use(express.json());

dotenv.config();

const host = process.env.HOST;
const port = process.env.PORT;
const book_file_name = process.env.BOOK_FILE_NAME;

let bookService = new BookService(book_file_name);

console.log(`host=${host}, port=${port}`);

app.get("/", (req, res) => {
  res.send(`Book Store Service Online. Now is ${new Date().toLocaleString()}`);
});

app.get("/getAll", (_, res) => {
  let bookList = bookService.getAll();
  res.json(bookList);
});

app.get("/getById/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let book = bookService.getById(id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send("Not found");
  }
});

app.post("/create", (req, res) => {
  let book = Book.fromObject(req.body);
  let result = bookService.create(book);
  res.json(result);
});

app.post("/update/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let book = Book.fromObject(req.body);
  let result = bookService.update(id, book);
  res.json(result);
});

app.get("/delete/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let result = bookService.delete(id);
  res.json(result);
});

app.listen(port, host, () => {
  console.log(
    `Book Store Service listening on port ${port}. Visit http://localhost:${port}`
  );
});
