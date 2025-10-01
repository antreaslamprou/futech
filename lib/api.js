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