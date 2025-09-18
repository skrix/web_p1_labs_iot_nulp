import Book from './book.js';
import data from './data.js';

class Store {
  constructor() {
    this.storageKey = 'books-store';
    this.loadFromStorage();
  }

  loadFromStorage() {
    const storedBooks = localStorage.getItem(this.storageKey);
    if (storedBooks) {
      this.books = JSON.parse(storedBooks).map(book => new Book(book));
    } else {
      // Initialize with default data if no stored data exists
      this.books = data.books.map(book => new Book(book));
      this.saveToStorage();
    }
  }

  saveToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.books));
  }

  add(bookData) {
    const book = new Book(...bookData);
    this.books.push(book);
    this.saveToStorage();
  }

  remove(bookId) {
    this.books = this.books.filter(book => book.id !== bookId);
    this.saveToStorage();
  }

  update(bookId, updatedData) {
    const bookIndex = this.books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      this.books[bookIndex] = new Book({ ...this.books[bookIndex], ...updatedData });
      this.saveToStorage();
    }
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

  calculateTotalPrice() {
    return this.books.reduce((total, book) => total + book.price, 0);
  }
}

export default Store;
