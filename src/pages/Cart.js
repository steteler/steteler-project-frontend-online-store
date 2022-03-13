import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CartCard from '../components/CartCard';
import { getFullCart, updateCartItem } from '../services/localStorageHandler';

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
    const items = getFullCart();
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
        <section>
          {count === 0
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
            )}
        </section>
        <div>
          <Link to="/checkout" data-testid="checkout-products">
            <button type="button">
              Finalizar compra
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
