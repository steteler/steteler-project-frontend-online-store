export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

export async function getProductsByQuery(query) {
  const headers = { Authorization: 'Bearer $ACCESS_TOKEN', method: 'GET' };
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`, headers);
  const data = await response.json();
  return data;
}

export async function getProductsFromCategoryAndQuery(_categoryId, query) {
  const result = await getProductsByQuery(query);
  return result;
}
