import React, { Component } from 'react';
import CartCard from '../components/CartCard';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    this.getCartProducts();
  }

  getCartProducts() {
    const items = JSON.parse(localStorage.getItem('cart'));
    this.setState({ items });
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        {
          items === null || items.length === 0
            ? (
              <span data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </span>
            )
            : (
              <div>
                {items.map(({ id }) => <CartCard key={ id } id={ id } />)}
              </div>
            )
        }
      </div>
    );
  }
}
