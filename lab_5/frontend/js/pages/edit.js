import { BookForm } from '../components/book-form.js';

function getBookIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'));
}

document.addEventListener('DOMContentLoaded', async () => {
  const store = window.store;
  const bookId = getBookIdFromUrl();

  if (!bookId) {
    window.location.href = '../pages/index.html';
    return;
  }

  let book;
  try {
    book = await store.getBook(bookId);
  } catch (error) {
    alert(`Failed to load book: ${error.message}`);
    window.location.href = '../pages/index.html';
    return;
  }

  if (!book) {
    window.location.href = '../pages/index.html';
    return;
  }

  const handleEdit = async (formData, originalBook) => {
    try {
      await store.update(originalBook.id, formData);
      window.location.href = '../pages/index.html';
    } catch (error) {
      alert(`Failed to update book: ${error.message}`);
    }
  };

  new BookForm('edit-form', book, handleEdit);
});
