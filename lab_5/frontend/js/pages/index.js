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

  if (books.length === 0) {
    booksGrid.innerHTML = '<p class="no-books">No books found</p>';
    return;
  }

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

function showLoading() {
  const booksGrid = document.getElementById('books-grid');
  booksGrid.innerHTML = '<p class="loading">Loading books...</p>';
}

function showError(message) {
  const booksGrid = document.getElementById('books-grid');
  booksGrid.innerHTML = `<p class="error">Error: ${message}</p>`;
}

function buildSearchParams(searchInput, sortSelect) {
  const params = {};

  // Add search term if provided
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    params.search = searchValue;
  }

  // Add sorting parameters
  if (sortSelect && sortSelect.value) {
    params.orderBy = sortSelect.value;
    params.order = 'asc'; // Default to ascending
  }

  return params;
}

// Perform search and render results
async function performSearch(store, searchInput, sortSelect) {
  try {
    showLoading();
    const searchParams = buildSearchParams(searchInput, sortSelect);
    const books = await store.search(searchParams);
    currentBooks = books;
    await renderBooks(currentBooks);
  } catch (error) {
    showError(error.message);
  }
}

function handleSearch(store, searchInput, sortSelect) {
  return () => performSearch(store, searchInput, sortSelect);
}

function handleClear(store, searchInput, sortSelect) {
  return async () => {
    searchInput.value = '';

    try {
      showLoading();
      const books = await store.clearSearch();
      currentBooks = books;
      await renderBooks(currentBooks);
    } catch (error) {
      showError(error.message);
    }
  };
}

function handleSortSelect(store, searchInput, sortSelect) {
  return () => performSearch(store, searchInput, sortSelect);
}

function handleCalculate() {
  return () => {
    const totalPrice = currentBooks.reduce((total, book) => total + book.price, 0);
    const totalPriceElement = document.getElementById('js-total-price');
    totalPriceElement.textContent = `${totalPrice.toFixed(2)} UAH`;
  };
}

function handleRemove(store) {
  return async (event) => {
    const bookId = parseInt(event.target.dataset.bookId);
    if (confirm('Are you sure you want to remove this book?')) {
      try {
        await store.remove(bookId);
        currentBooks = currentBooks.filter(book => book.id !== bookId);
        await renderBooks(currentBooks);
      } catch (error) {
        alert(`Failed to remove book: ${error.message}`);
      }
    }
  };
}

function handleEdit(event) {
  const bookId = parseInt(event.target.dataset.bookId);
  window.location.href = `../pages/edit.html?id=${bookId}`;
}

let currentBooks = [];

document.addEventListener('DOMContentLoaded', async () => {
  const store = window.store;
  const searchInput = document.getElementById('js-search-input');
  const searchButton = document.getElementById('js-search-btn');
  const clearButton = document.getElementById('js-clear-btn');
  const sortSelect = document.getElementById('js-sort-select');
  const calculateButton = document.getElementById('js-calculate-btn');


  try {
    showLoading();
    await store.loadBooks();
    currentBooks = store.books;
    await renderBooks(currentBooks);
  } catch (error) {
    showError(error.message);
  }

  searchButton.addEventListener('click', handleSearch(store, searchInput, sortSelect));
  clearButton.addEventListener('click', handleClear(store, searchInput, sortSelect));
  sortSelect.addEventListener('change', handleSortSelect(store, searchInput, sortSelect));
  calculateButton.addEventListener('click', handleCalculate());

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchButton.click();
    }
  });
});
