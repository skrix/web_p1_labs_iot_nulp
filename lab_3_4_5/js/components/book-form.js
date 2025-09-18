export class BookForm {
  constructor(formId, book, submitHandler) {
    this.formId = formId;
    this.form = document.getElementById(formId);
    this.book = book;
    this.submitHandler = submitHandler;
    this.init();
  }

  init() {
    if (!this.form) {
      console.error(`Form with id "${this.formId}" not found`);
      return;
    }

    this.populateForm();
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  handleSubmit(event) {
    event.preventDefault();
    this.hideAlert();

    if (!this.validateForm()) {
      return;
    }

    const formData = this.collectFormData();
    this.submitHandler(formData, this.book);
  }

  populateForm() {
    if (!this.book) return;

    document.getElementById('title').value = this.book.title || '';
    document.getElementById('author').value = this.book.author || '';
    document.getElementById('description').value = this.book.description || '';
    document.getElementById('price').value = this.book.price || '0.00';
    document.getElementById('isbn').value = this.book.isbn || '';
    document.getElementById('genre').value = this.book.genre || '';
  }

  clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '0.00';
    document.getElementById('isbn').value = '';
    document.getElementById('genre').value = '';
  }

  showAlert(message) {
    const alertElement = document.getElementById('js-error-alert');
    const alertText = document.getElementById('js-error-text');
    alertText.textContent = message;
    alertElement.style.display = 'block';
  }

  hideAlert() {
    const alertElement = document.getElementById('js-error-alert');
    alertElement.style.display = 'none';
  }

  validateForm() {
    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const isbn = document.getElementById('isbn').value.trim();
    const genre = document.getElementById('genre').value;

    if (!title || title.length < 2) {
      this.showAlert('Title must be at least 2 characters long');
      return false;
    }

    if (!author || author.length < 2) {
      this.showAlert('Author name must be at least 2 characters long');
      return false;
    }

    if (isNaN(price) || price <= 0) {
      this.showAlert('Price must be a valid positive number');
      return false;
    }

    if (!isbn.match(/^978-\d-\d{2}-\d{6}-\d$/)) {
      this.showAlert('ISBN must be in format: 978-X-XX-XXXXXX-X');
      return false;
    }

    if (!genre) {
      this.showAlert('Please select a genre');
      return false;
    }

    return true;
  }

  collectFormData() {
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
}
