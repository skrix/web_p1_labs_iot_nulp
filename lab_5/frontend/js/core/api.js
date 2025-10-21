const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return null;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Book endpoints
  async getBooks(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/books?${queryString}` : '/books';
    return this.request(endpoint);
  }

  async getBook(id) {
    return this.request(`/books/${id}`);
  }

  async createBook(bookData) {
    return this.request('/books', {
      method: 'POST',
      body: JSON.stringify(bookData),
    });
  }

  async updateBook(id, bookData) {
    return this.request(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    });
  }

  async deleteBook(id) {
    return this.request(`/books/${id}`, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
