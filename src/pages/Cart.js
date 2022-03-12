import React, { Component } from 'react';
import CartCard from '../components/CartCard';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      count: 0,
    };
  }

  componentDidMount() {
    this.getCartProducts();
  }

  getCartProducts() {
    const items = JSON.parse(localStorage.getItem('cart'));
    this.setState({ items, count: items !== null ? items.length : 0 });
  }

  render() {
    const { items, count } = this.state;
    return (
      <div>
        <h2 data-testid="shopping-cart-product-quantity">{count}</h2>
        {
          count === 0
            ? (
              <span data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </span>
            )
            : (
              <div>
                {items.map((id) => <CartCard key={ id } id={ id } />)}
              </div>
            )
        }
      </div>
    );
  }
}
