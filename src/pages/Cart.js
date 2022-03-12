import React, { Component } from 'react';
import CartCard from '../components/CartCard';
import { getCart, updateCartItem } from '../services/cartHandler';

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

  getCartProducts = () => {
    const items = getCart();
    this.setState({ items, count: items !== null ? items.length : 0 });
  }

  updateItem = (product, quantity) => {
    updateCartItem(product.id, quantity);
    this.getCartProducts();
  }

  render() {
    const { items, count } = this.state;
    return (
      <div>
        {
          count === 0
            ? (
              <span data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </span>
            )
            : (
              <div>
                {items.map(({ product, quantity }) => (<CartCard
                  key={ product.id }
                  product={ product }
                  quantity={ quantity }
                  updateItem={ this.updateItem }
                />))}
              </div>
            )
        }
      </div>
    );
  }
}
