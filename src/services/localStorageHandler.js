const addToCart = (product, quantity) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) cart = [];
  if (cart.some((item) => item.product.id === product.id)) return;
  const newCart = [...cart, { product, quantity }];
  localStorage.setItem('cart',
    JSON.stringify(newCart));
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

const getCart = () => JSON.parse(localStorage.getItem('cart'));

const getItem = (id) => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  return cart.find((item) => id === item.id);
};

const saveLocalStorageRating = (ratingPram) => {
  let ratings = JSON.parse(localStorage.getItem('productRating'));
  if (ratings === null) ratings = '[]';
  const newRating = [...ratings, ratingPram];
  localStorage.setItem('productRating',
    JSON.stringify(newRating));
};

const getLocalStorageRating = () => {
  let result = JSON.parse(localStorage.getItem('productRating'));
  if (result === null) result = [];
  return result;
};

export { addToCart, getCart, updateCartItem, getItem,
  saveLocalStorageRating, getLocalStorageRating };
