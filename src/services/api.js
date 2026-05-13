import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// tự động gắn token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// AUTH API
export const apiAuth = {
  login: (data) => apiClient.post('/auth/login', data),

  register: (data) => apiClient.post('/auth/register', data),

  profile: () => apiClient.get('/auth/profile'),

  logout: () => {
    localStorage.removeItem('token');
  },
};

// CATEGORY API
export const apiCategories = {
  get: () => apiClient.get('/categories'),

  create: (data) => apiClient.post('/categories', data),

  update: (id, data) => apiClient.patch(`/categories/${id}`, data),

  delete: (id) => apiClient.delete(`/categories/${id}`),
};

// EXPENSE API
export const apiExpenses = {
  get: () => apiClient.get('/expenses'),

  create: (data) => apiClient.post('/expenses', data),

  update: (id, data) => apiClient.patch(`/expenses/${id}`, data),

  delete: (id) => apiClient.delete(`/expenses/${id}`),
};

// INCOME API
export const apiIncome = {
  get: () => apiClient.get('/incomes'),

  create: (data) => apiClient.post('/incomes', data),

  update: (id, data) => apiClient.patch(`/incomes/${id}`, data),

  delete: (id) => apiClient.delete(`/incomes/${id}`),
};

// BUDGET API
export const apiBudgets = {
  get: (filter) => apiClient.get('/budgets', { params: filter }),

  getDetail: (id) => apiClient.get(`/budgets/${id}`),

  create: (data) => apiClient.post('/budgets', data),

  update: (id, data) => apiClient.patch(`/budgets/${id}`, data),

  delete: (id) => apiClient.delete(`/budgets/${id}`),
};

// SAVINGS API
export const apiSavings = {
  get: () => apiClient.get('/savings'),

  create: (data) => apiClient.post('/savings', data),

  update: (id, data) => apiClient.patch(`/savings/${id}`, data),

  delete: (id) => apiClient.delete(`/savings/${id}`),
};

// USER API
export const apiUsers = {
  get: () => apiClient.get('/users'),

  create: (data) => apiClient.post('/users', data),

  update: (id, data) => apiClient.patch(`/users/${id}`, data),

  delete: (id) => apiClient.delete(`/users/${id}`),
};

// CHART API
export const apiCharts = {
  weekly: () => apiClient.get('/charts/weekly'),

  monthly: () => apiClient.get('/charts/monthly'),

  category: () => apiClient.get('/charts/categories'),

  dashboard: () => apiClient.get('/charts/dashboard'),

  processing: () => apiClient.get('/charts/processing'),
};
