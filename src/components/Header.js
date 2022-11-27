import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/Header.css';

export default class Header extends Component {
  render() {
    const { cartSize } = this.props;
    return (
      <header className="main-header">
        <div className="header-cart-container">
          <h3>HEADER</h3>
          <Link
            to="/cart"
            className="header-shopping-cart"
            data-testid="shopping-cart-button"
          >
            <img className="header-shopping-cart-image" src="https://cdn-icons-png.flaticon.com/128/4564/4564235.png" alt="Carrinho" />
            <span
              className="cartsize"
              id="header-cartsize"
              data-testid="shopping-cart-size"
            >
              {cartSize !== undefined ? cartSize : 0}
            </span>
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  cartSize: PropTypes.number,
}.isRequired;
