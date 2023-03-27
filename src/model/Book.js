class Book {
  constructor(id, title, author, price) {
    if (id && typeof id === "number") {
      this.id = id;
    }
    if (title && typeof title === "string") {
      this.title = title;
    }
    if (author && typeof author === "string") {
      this.author = author;
    }
    if (price && typeof price === "number") {
      this.price = price;
    }
  }

  static fromObject(obj) {
    if (obj) {
      let book = new Book(obj.id, obj.title, obj.author, obj.price);
      return book;
    }
    return null;
  }
}

module.exports = { Book };
