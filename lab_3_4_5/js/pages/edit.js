function getBookIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id'));
}

function populateForm(book) {
  document.getElementById('title').value = book.title;
  document.getElementById('author').value = book.author;
  document.getElementById('description').value = book.description;
  document.getElementById('price').value = book.price;
  document.getElementById('isbn').value = book.isbn;
  document.getElementById('genre').value = book.genre;
}

function collectFormData() {
  return {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    description: document.getElementById('description').value,
    price: parseFloat(document.getElementById('price').value),
    isbn: document.getElementById('isbn').value,
    genre: document.getElementById('genre').value
  };
}

function handleEditSubmit(store, bookId) {
  return (event) => {
    event.preventDefault();

    const formData = collectFormData();
    store.update(bookId, formData);

    window.location.href = '../pages/index.html';
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;
  const bookId = getBookIdFromUrl();
  const form = document.getElementById('edit-form');

  if (!bookId) {
    window.location.href = '../pages/index.html';
    return;
  }

  const book = store.books.find(book => book.id === bookId);

  if (!book) {
    window.location.href = '../pages/index.html';
    return;
  }

  populateForm(book, form);

  form.addEventListener('submit', handleEditSubmit(store, bookId));
});
