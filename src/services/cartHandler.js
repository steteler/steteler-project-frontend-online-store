const addToCart = (event, id) => {
  event.preventDefault();
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (cart === null) cart = [];
  const newCart = [...cart, id];
  localStorage.setItem('cart',
    JSON.stringify(newCart));
};

const getCart = () => JSON.parse(localStorage.getItem('cart'));

export { addToCart, getCart };
