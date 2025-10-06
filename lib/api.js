// Products
// DB
export async function fetchProducts() {
  const res = await fetch('/api/products');
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch');
  return data.products;
}

export async function fetchProductById(id) {
  const res = await fetch(`/api/products/${id}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch');
  return data.product;
}

// JSON
export async function fetchProductsJSON() {
  const res = await fetch('/data/products.json');
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
  const products = await res.json();
  return products;
}

export async function fetchProductByIdJSON(id) {
  const products = await fetchProductsJSON();
  return products.find(product => String(product.id) === String(id));
}

// Checkout
export async function checkoutBasket(basket, user) {
  const res = await fetch('/api/orders/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ basket, user }),
  });
  if (!res.ok) throw new Error(`Failed to checkout: ${res.status}`);
  const data = await res.json();
  return data;
}

// Orders
export async function fetchOrders(userId) {
  userId = Number(userId);
  const res = await fetch('/api/orders',{ 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
  const data = await res.json();
  return data.orders;
}

export async function fetchOrderItems(orderId) {
  const res = await fetch(`/api/orders/${orderId}`);
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch');
  return data.orderItems;
}

// Countries
export async function fetchCountriesJSON() {
  const res = await fetch('/data/countries.json');
  if (!res.ok) throw new Error(`Failed to fetch countries: ${res.status}`);
  const countries = await res.json();
  return countries;
}

export async function fetchCountryByCodeJSON(code) {
  const countries = await fetchCountriesJSON();
  const countryDetails = countries.find(country => String(country.code) === String(code));
  return countryDetails.name;
}

// User
export async function getUser() {
  const res = await fetch('/api/user');
  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to fetch');
  return data;
}

export async function addUser(userData) {
  const res = await fetch("/api/user/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res;
}

export async function updateUser(email, formData ) {
  const res = await fetch("/api/user/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      userData: formData,
    }),
  });
  
  const newUserData = await res.json();
  return newUserData;
}

export async function fetchUserByEmail(email) {
  const res = await fetch(`/api/user/${email}`);
  const data = await res.json();
  if (!data.success || !data.user) throw new Error(data.error || 'User not found');
  return data.user;
}

// Reset Password
export async function sendPasswordResetLink(userId, email) {
  const res = await fetch('/api/auth/send-reset-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, email })
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to send reset link');
  return data;
}

export async function validateToken(token) {
  const res = await fetch(`/api/auth/send-reset?token=${token}`);

  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to validate token');
  return data;
}

export async function resetPassword(token, userId, password) {
  const res = await fetch('/api/auth/send-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, userId, password })
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'Failed to reset password');
  return data;
}