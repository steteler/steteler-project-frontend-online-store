const addToCart = (event, id) => {
  event.preventDefault();
  let cart = localStorage.getItem('cart');
  if (cart === null) cart = [];
  const newCart = [...cart, id];
  localStorage.setItem('cart',
    JSON.stringify(newCart));
};

export default addToCart;
