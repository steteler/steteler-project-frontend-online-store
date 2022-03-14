const getFullCart = () => JSON.parse(localStorage.getItem('cart'));

const getProductRating = () => JSON.parse(localStorage.getItem('productRating'));

const addToCart = (product, quantity) => {
  let cart = getFullCart();
  if (cart === null) cart = [];
  if (cart.some((item) => item.product.id === product.id)) return;
  const newCart = [...cart, { product, quantity }];
  localStorage.setItem('cart',
    JSON.stringify(newCart));
};

const updateCartItem = (id, quantity) => {
  let cart = getFullCart();
  if (cart === null) cart = [];
  if (quantity < 1) return;
  cart = cart.map((item) => {
    if (id === item.product.id) {
      return { ...item, quantity };
    }
    return item;
  });

  localStorage.setItem('cart',
    JSON.stringify(cart));
};

const getItem = (id) => {
  const cart = getFullCart();
  return cart.find((item) => id === item.id);
};

/* Funções relacionadas a avaliação dos produtos */

const saveLocalStorageRating = (ratingParam) => {
  let ratings = getProductRating();
  if (ratings === null) ratings = '[]';
  const newRating = [...ratings, ratingParam];
  localStorage.setItem('productRating',
    JSON.stringify(newRating));
};

const getLocalStorageRating = () => {
  let result = getProductRating();
  if (result === null) result = [];
  return result;
};

export { addToCart, getFullCart, updateCartItem, getItem,
  saveLocalStorageRating, getLocalStorageRating };
