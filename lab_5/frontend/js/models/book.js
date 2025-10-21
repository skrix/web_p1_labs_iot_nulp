class Book {
  constructor({
    id,
    title,
    author,
    description = '',
    price,
    genre = '',
    isbn = '',
    image_url = ''
  }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.description = description;
    this.price = price;
    this.genre = genre;
    this.isbn = isbn;
    this.image_url = image_url;
  }
}

export default Book;
