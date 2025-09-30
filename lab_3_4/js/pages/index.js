async function loadCardTemplate() {
  const response = await fetch('../components/card.html');
  return await response.text();
}

function renderBookTemplate(book, template) {
  return template
    .replace(/{{id}}/g, book.id)
    .replace(/{{image_url}}/g, book.image_url)
    .replace(/{{title}}/g, book.title)
    .replace(/{{author}}/g, book.author)
    .replace(/{{description}}/g, book.description)
    .replace(/{{genre}}/g, book.genre)
    .replace(/{{isbn}}/g, book.isbn)
    .replace(/{{price}}/g, book.price);
}

async function renderBooks(books) {
  const cardTemplate = await loadCardTemplate();
  const booksGrid = document.getElementById('books-grid');
  booksGrid.innerHTML = books.map(book => renderBookTemplate(book, cardTemplate)).join('');

  const editBookButtons = document.querySelectorAll('.js-edit-btn');
  const removeBookButtons = document.querySelectorAll('.js-remove-btn');

  editBookButtons.forEach(editBookButton => {
    editBookButton.addEventListener('click', handleEdit);
  });
  removeBookButtons.forEach(removeBookButton => {
    removeBookButton.addEventListener('click', handleRemove(window.store));
  });
}

function byPrice(book1, book2) { return book1.price - book2.price };
function byTitle(book1, book2) { return book1.title.localeCompare(book2.title) };
function byAuthor(book1, book2) { return book1.author.localeCompare(book2.author) };

function sortBooks(books, sortSelect) {
  const sortType = sortSelect.value;
  switch (sortType) {
    case 'price':
      return books.sort(byPrice);
    case 'author':
      return books.sort(byAuthor);
    case 'title':
    default:
      return books.sort(byTitle);
  }
}

function handleSearch(store, searchInput, sortSelect) {
  return () => {
    const books = store.search(searchInput.value);
    currentBooks = sortBooks(books, sortSelect);
    renderBooks(currentBooks);
  };
}

function handleClear(store, searchInput, sortSelect) {
  return () => {
    searchInput.value = '';
    const books = store.clearSearch();
    currentBooks = sortBooks(books, sortSelect);
    renderBooks(currentBooks);
  };
}

function handleSortSelect(store, sortSelect) {
  return () => {
    currentBooks = sortBooks(currentBooks, sortSelect);
    renderBooks(currentBooks);
  };
}

function handleCalculate() {
  return () => {
    const totalPrice = currentBooks.reduce((total, book) => total + book.price, 0);
    const totalPriceElement = document.getElementById('js-total-price');
    totalPriceElement.textContent = `${totalPrice.toFixed(2)} UAH`;
  };
}

function handleRemove(store) {
  return (event) => {
    const bookId = parseInt(event.target.dataset.bookId);
    if (confirm('Are you sure you want to remove this book?')) {
      store.remove(bookId);
      currentBooks = currentBooks.filter(book => book.id !== bookId);
      renderBooks(currentBooks);
    }
  };
}

function handleEdit(event) {
  const bookId = parseInt(event.target.dataset.bookId);
  window.location.href = `../pages/edit.html?id=${bookId}`;
}

let currentBooks = [];

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;
  const searchInput = document.getElementById('js-search-input');
  const searchButton = document.getElementById('js-search-btn');
  const clearButton = document.getElementById('js-clear-btn');
  const sortSelect = document.getElementById('js-sort-select');
  const calculateButton = document.getElementById('js-calculate-btn');

  currentBooks = store.books;
  renderBooks(currentBooks);

  searchButton.addEventListener('click', handleSearch(store, searchInput, sortSelect));
  clearButton.addEventListener('click', handleClear(store, searchInput, sortSelect));
  sortSelect.addEventListener('change', handleSortSelect(store, sortSelect));
  calculateButton.addEventListener('click', handleCalculate());
});
