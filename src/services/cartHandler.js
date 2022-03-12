const addToCart = (product, quantity) => {
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) cart = [];
  if (cart.some((item) => item.product.id === product.id)) return;
  const newCart = [...cart, { product, quantity }];
  localStorage.setItem('cart',
    JSON.stringify(newCart));
};

const updateCartItemQuantity = (id, quantity) => {
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

export { addToCart, getCart, updateCartItemQuantity as updateCartItem, getItem };
