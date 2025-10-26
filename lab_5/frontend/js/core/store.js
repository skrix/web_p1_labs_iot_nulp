import Book from '../models/book.js';
import api from './api.js';

class Store {
  constructor() {
    this.books = [];
    this.loading = false;
    this.error = null;
  }

  // Fetch all books from API
  async loadBooks(params = {}) {
    this.loading = true;
    this.error = null;
    try {
      const data = await api.getBooks(params);
      this.books = data.map(book => new Book(book));
      return this.books;
    } catch (error) {
      this.error = error.message;
      console.error('Failed to load books:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Add a new book via API
  async add(bookData) {
    this.loading = true;
    this.error = null;
    try {
      const newBook = await api.createBook(bookData);
      const book = new Book(newBook);
      this.books.push(book);
      return book;
    } catch (error) {
      this.error = error.message;
      console.error('Failed to add book:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Remove a book via API
  async remove(bookId) {
    this.loading = true;
    this.error = null;
    try {
      await api.deleteBook(bookId);
      this.books = this.books.filter(book => book.id !== bookId);
    } catch (error) {
      this.error = error.message;
      console.error('Failed to remove book:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Update a book via API
  async update(bookId, updatedData) {
    this.loading = true;
    this.error = null;
    try {
      await api.updateBook(bookId, updatedData);
      const bookIndex = this.books.findIndex(book => book.id === bookId);
      if (bookIndex !== -1) {
        this.books[bookIndex] = new Book({ ...this.books[bookIndex], ...updatedData });
      }
    } catch (error) {
      this.error = error.message;
      console.error('Failed to update book:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Get a single book by ID
  async getBook(bookId) {
    this.loading = true;
    this.error = null;
    try {
      const data = await api.getBook(bookId);
      return new Book(data);
    } catch (error) {
      this.error = error.message;
      console.error('Failed to get book:', error);
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Sort books (local operation)
  sort(compareFn) {
    return this.books.sort(compareFn);
  }

  // Search books with multiple criteria
  async search(searchParams = {}) {
    // Handle string input for simple search
    if (typeof searchParams === 'string') {
      return searchParams.trim()
        ? this.loadBooks({ search: searchParams.trim() })
        : this.loadBooks();
    }

    // Filter out empty values and pass to loadBooks
    const params = Object.entries(searchParams)
      .filter(([_, value]) => value !== '' && value != null)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    return this.loadBooks(params);
  }

  // Clear search (reload all books)
  async clearSearch() {
    return this.loadBooks();
  }

  // Calculate total price (local operation)
  calculateTotalPrice() {
    return this.books.reduce((total, book) => total + book.price, 0);
  }
}

export default Store;
