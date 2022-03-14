import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { cartSize } = this.props;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
        <p data-testid="shopping-cart-size">
          { cartSize !== undefined ? cartSize : 0 }
        </p>
      </div>
    );
  }
}

Header.propTypes = {
  cartSize: PropTypes.number,
}.isRequired;
