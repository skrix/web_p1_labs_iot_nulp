function collectFormData() {
  return {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    description: document.getElementById('description').value,
    price: parseFloat(document.getElementById('price').value),
    isbn: document.getElementById('isbn').value,
    genre: document.getElementById('genre').value,
    image_url: ''
  };
}

function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('description').value = '';
  document.getElementById('price').value = '0.00';
  document.getElementById('isbn').value = '';
  document.getElementById('genre').value = '';
}

function handleCreateSubmit(store) {
  return (event) => {
    event.preventDefault();

    const formData = collectFormData();
    store.add(formData);

    clearForm();
    window.location.href = '../pages/index.html';
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;
  const form = document.getElementById('create-form');

  form.addEventListener('submit', handleCreateSubmit(store));
});