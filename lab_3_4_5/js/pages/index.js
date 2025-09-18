async function loadCardTemplate() {
  const response = await fetch('../../components/card.html');
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
function sortBooks(books, sortToggle) {
  if (sortToggle.checked) {
    return books.sort(byPrice);
  } else {
    return books.sort(byTitle);
  }
}

function handleSearch(store, searchInput, sortToggle) {
  return () => {
    const books = store.search(searchInput.value);
    renderBooks(sortBooks(books, sortToggle));
  };
}

function handleClear(store, searchInput, sortToggle) {
  return () => {
    searchInput.value = '';
    const books = store.clearSearch();
    renderBooks(sortBooks(books, sortToggle));
  };
}

function handleSortToggle(store, sortToggle) {
  return () => {
    renderBooks(sortBooks(store.books, sortToggle));
  };
}

function handleCalculate(store) {
  return () => {
    const totalPrice = store.calculateTotalPrice();
    const totalPriceElement = document.getElementById('js-total-price');
    totalPriceElement.textContent = `${totalPrice.toFixed(2)} UAH`;
  };
}

function handleRemove(store) {
  console.log(store);
  return (event) => {
    console.log(event);
    const bookId = parseInt(event.target.dataset.bookId);
    if (confirm('Are you sure you want to remove this book?')) {
      store.remove(bookId);
      renderBooks(store.books);
    }
  };
}

function handleEdit(event) {
  console.log(event);
  const bookId = parseInt(event.target.dataset.bookId);
  window.location.href = `../pages/edit.html?id=${bookId}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;
  const searchInput = document.getElementById('js-search-input');
  const searchButton = document.getElementById('js-search-btn');
  const clearButton = document.getElementById('js-clear-btn');
  const sortToggle = document.getElementById('js-sort-toggle');
  const calculateButton = document.getElementById('js-calculate-btn');

  renderBooks(store.books);

  searchButton.addEventListener('click', handleSearch(store, searchInput, sortToggle));
  clearButton.addEventListener('click', handleClear(store, searchInput, sortToggle));
  sortToggle.addEventListener('change', handleSortToggle(store, sortToggle));
  calculateButton.addEventListener('click', handleCalculate(store));
});
