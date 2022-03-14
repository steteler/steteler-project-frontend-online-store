import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCartItemsQuantity } from '../services/localStorageHandler';

export default class Header extends Component {
  render() {
    console.log(getCartItemsQuantity());
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <p>
          { getCartItemsQuantity() }
        </p>
      </div>
    );
  }
}
