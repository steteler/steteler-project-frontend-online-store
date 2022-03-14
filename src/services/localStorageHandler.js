const addToCart = (product, quantity) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) cart = [];
  if (cart.some((item) => item.product.id === product.id)) return;
  const newCart = [...cart, { product, quantity }];
  localStorage.setItem('cart',
    JSON.stringify(newCart));
};
const getFullCart = () => JSON.parse(localStorage.getItem('cart'));

const getCartItemsQuantity = () => {
  let cart = getFullCart();
  if (cart === null) cart = [];
  return cart.reduce(((accumulator, item) => accumulator + item.quantity), 0);
};

const updateCartItem = (id, quantity) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
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
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart.find((item) => id === item.id);
};

/* Funções relacionadas a avaliação dos produtos */

const saveLocalStorageRating = (ratingParam) => {
  let ratings = JSON.parse(localStorage.getItem('productRating'));
  if (ratings === null) ratings = '[]';
  const newRating = [...ratings, ratingParam];
  localStorage.setItem('productRating',
    JSON.stringify(newRating));
};

const getLocalStorageRating = () => {
  let result = JSON.parse(localStorage.getItem('productRating'));
  if (result === null) result = [];
  return result;
};

export {
  addToCart, getFullCart, updateCartItem, getItem,
  saveLocalStorageRating, getLocalStorageRating, getCartItemsQuantity,
};
