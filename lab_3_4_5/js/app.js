import { renderBooks, handleSearch, handleClear, handleSortToggle } from './pages/index.js';
import Store from './store.js';

document.addEventListener('DOMContentLoaded', () => {
  const store = new Store();
  const searchInput = document.getElementById('js-search-input');
  const searchButton = document.getElementById('js-search-btn');
  const clearButton = document.getElementById('js-clear-btn');
  const sortToggle = document.getElementById('js-sort-toggle');

  renderBooks(store.books);

  searchButton.addEventListener('click', handleSearch(store, searchInput, sortToggle));
  clearButton.addEventListener('click', handleClear(store, searchInput, sortToggle));
  sortToggle.addEventListener('change', handleSortToggle(store, sortToggle));
});
