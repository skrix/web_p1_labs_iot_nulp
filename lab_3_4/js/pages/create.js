import { BookForm } from '../components/book-form.js';

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;

  const handleCreate = (formData) => {
    store.add(formData);
    window.location.href = '../pages/index.html';
  };

  new BookForm('create-form', null, handleCreate);
});
