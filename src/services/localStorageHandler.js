const getFullCart = () => JSON.parse(localStorage.getItem('cart'));

const getProductRating = () => JSON.parse(localStorage.getItem('productRating'));

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

const addToCart = (product, quantity) => {
  let cart = getFullCart();
  if (cart === null) cart = [];
  let productQuantity = 0;
  if (cart.some((item) => {
    productQuantity = item.quantity;
    return item.product.id === product.id;
  })) {
    updateCartItem(product.id, productQuantity + 1);
    return;
  }
  const newCart = [...cart, { product, quantity }];
  localStorage.setItem('cart',
    JSON.stringify(newCart));
};

const getCartItemsQuantity = () => {
  let cart = getFullCart();
  if (cart === null) cart = [];
  return cart.reduce(((accumulator, item) => accumulator + item.quantity), 0);
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

export {
  addToCart, getFullCart, updateCartItem, getItem,
  saveLocalStorageRating, getLocalStorageRating, getCartItemsQuantity,
};
