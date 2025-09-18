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

function handleSearch(store, searchInput) {
  return () => { renderBooks(store.search(searchInput.value)) };
}

function handleClear(store, searchInput) {
  return () => {
    searchInput.value = '';
    renderBooks(store.clearSearch());
  };
}

export {
  renderBooks,
  handleSearch,
  handleClear
}
