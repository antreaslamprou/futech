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
  if (!res.ok) throw new Error(`Failed to fetch countries: ${res.status}`);
  const products = await res.json();
  return products;
}

export async function fetchProductByIdJSON(id) {
  const products = await fetchProductsJSON();
  return products.find(product => String(product.id) === String(id));
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

// Register
export async function registerUser(userData) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res;
}