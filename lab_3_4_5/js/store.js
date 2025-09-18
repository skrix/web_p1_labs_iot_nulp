import Book from './book.js';
import * as data from './data.js';

class Store {
  constructor() {
    this.books = data.books.map(book => new Book(...book));
  }
}

export default Store;
