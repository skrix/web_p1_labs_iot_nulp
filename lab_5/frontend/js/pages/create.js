import { BookForm } from '../components/book-form.js';

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;

  const handleCreate = async (formData) => {
    try {
      await store.add(formData);
      window.location.href = '../pages/index.html';
    } catch (error) {
      alert(`Failed to create book: ${error.message}`);
    }
  };

  new BookForm('create-form', null, handleCreate);
});
