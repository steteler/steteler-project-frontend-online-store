export async function getCategories() {
  const HEADERS = { Accept: 'application/json' };
  const responseAlgumaCoisa = (
    await fetch('https://api.mercadolibre.com/sites/MLB/categories', HEADERS));
  console.log(responseAlgumaCoisa);
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}
