import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  addToCart = (event, id) => {
    event.preventDefault();
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (cart === null) cart = [];
    const newCart = [...cart, id];
    localStorage.setItem('cart',
      JSON.stringify(newCart));
  }

  render() {
    const { price, title, thumbnail, id } = this.props;
    return (
      <div data-testid="product">
        <div>
          <img src={ thumbnail } alt={ title } />
        </div>
        <h3>{title}</h3>
        <span>{price}</span>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ (event) => this.addToCart(event, id) }
        >
          Adicionar ao carrinho
        </button>
        <hr />
      </div>
    );
  }
}

Card.propTypes = {
  price: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
