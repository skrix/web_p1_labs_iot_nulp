function showAlert(message) {
  const alertElement = document.getElementById('js-error-alert');
  const alertText = document.getElementById('js-error-text');
  alertText.textContent = message;
  alertElement.style.display = 'block';
}

function hideAlert() {
  const alertElement = document.getElementById('js-error-alert');
  alertElement.style.display = 'none';
}

function validateForm() {
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const price = parseFloat(document.getElementById('price').value);
  const isbn = document.getElementById('isbn').value.trim();
  const genre = document.getElementById('genre').value;

  if (!title || title.length < 2) {
    showAlert('Title must be at least 2 characters long');
    return false;
  }

  if (!author || author.length < 2) {
    showAlert('Author name must be at least 2 characters long');
    return false;
  }

  if (isNaN(price) || price <= 0) {
    showAlert('Price must be a valid positive number');
    return false;
  }

  if (!isbn.match(/^978-\d-\d{2}-\d{6}-\d$/)) {
    showAlert('ISBN must be in format: 978-X-XX-XXXXXX-X');
    return false;
  }

  if (!genre) {
    showAlert('Please select a genre');
    return false;
  }

  return true;
}

function collectFormData() {
  return {
    title: document.getElementById('title').value.trim(),
    author: document.getElementById('author').value.trim(),
    description: document.getElementById('description').value.trim(),
    price: parseFloat(document.getElementById('price').value),
    isbn: document.getElementById('isbn').value.trim(),
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
    hideAlert();

    if (!validateForm()) {
      return;
    }

    const formData = collectFormData();
    store.add(formData);

    clearForm();
    window.location.href = '../pages/index.html';
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const store = window.store;
  const form = document.getElementById('create-form');
  const closeAlert = document.getElementById('close-alert');

  form.addEventListener('submit', handleCreateSubmit(store));
  closeAlert.addEventListener('click', (e) => {
    e.preventDefault();
    hideAlert();
  });
});
