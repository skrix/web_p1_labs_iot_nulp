import Book from './book.js';
import data from './data.js';

class Store {
  constructor() {
    this.books = data.books.map(book => new Book(book));
  }

  add(bookData) {
    const book = new Book(...bookData);
    this.books.push(book);
  }

  remove(bookId) {
    this.books = this.books.filter(book => book.id !== bookId);
  }

  sort(compareFn) {
    this.books.sort(compareFn);
  }
}

export default Store;
