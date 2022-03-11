export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await response.json();
  return data;
}

/* export async function getProductsFromCategoryAndQuery(categoryId, query) {

} */

export async function getProductsByQuery(query) {
  const headers = { Authorization: 'Bearer $ACCESS_TOKEN', method: 'GET' };
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`, headers);
  const data = await response.json();
  return data.results;
}
