import { renderBooks, handleSearch, handleClear } from './pages/index.js';
import Store from './store.js';

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store();
  renderBooks(store.books);

  const searchInput = document.getElementById('js-search-input');
  const searchButton = document.getElementById('js-search-btn');
  const clearButton = document.getElementById('js-clear-btn');

  searchButton.addEventListener('click', handleSearch(store, searchInput));
  clearButton.addEventListener('click', handleClear(store, searchInput));
});
