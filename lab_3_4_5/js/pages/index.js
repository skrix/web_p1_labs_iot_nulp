async function loadCardTemplate() {
  const response = await fetch('../../components/card.html');
  return await response.text();
}

function renderBookTemplate(book, template) {
  return template
    .replace(/{{image_url}}/g, book.image_url)
    .replace(/{{title}}/g, book.title)
    .replace(/{{author}}/g, book.author)
    .replace(/{{description}}/g, book.description)
    .replace(/{{genre}}/g, book.genre)
    .replace(/{{isbn}}/g, book.isbn)
    .replace(/{{price}}/g, book.price)
    .replace(/{{edit_url}}/g, `../pages/edit.html?id=${book.id}`)
    .replace(/{{remove_url}}/g, `#remove-${book.id}`);
}

async function renderBooks(books) {
  const cardTemplate = await loadCardTemplate();
  const booksGrid = document.getElementById('books-grid');
  booksGrid.innerHTML = books.map(book => renderBookTemplate(book, cardTemplate)).join('');
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

export {
  renderBooks,
  handleSearch,
  handleClear,
  handleSortToggle
}
