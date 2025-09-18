import Store from './store.js';
import cardTemplate from '../components/card.html?raw';

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

function renderBooks(books, template) {
  const booksGrid = document.getElementById('books-grid');
  booksGrid.innerHTML = books.map(book => renderBookTemplate(book, template)).join('');
}

document.addEventListener('DOMContentLoaded', async () => {
  const store = new Store();
  renderBooks(store.books, cardTemplate);
});
