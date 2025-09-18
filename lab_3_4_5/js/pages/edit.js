import { BookForm } from '../components/book-form.js';

function getBookIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'));
}

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;
  const bookId = getBookIdFromUrl();

  if (!bookId) {
    window.location.href = '../pages/index.html';
    return;
  }

  const book = store.books.find(book => book.id === bookId);

  if (!book) {
    window.location.href = '../pages/index.html';
    return;
  }

  const handleEdit = (formData, originalBook) => {
    store.update(originalBook.id, formData);
    window.location.href = '../pages/index.html';
  };

  new BookForm('edit-form', book, handleEdit);
});
