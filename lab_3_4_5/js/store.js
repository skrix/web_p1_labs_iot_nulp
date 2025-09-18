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
    return this.books.sort(compareFn);
  }

  search(title) {
    if (!title || title.trim() === '') {
      return this.books;
    }

    return this.books.filter(book => book.title.toLowerCase().includes(title.toLowerCase().trim()));;
  }

  clearSearch() {
    return this.books;
  }
}

export default Store;
