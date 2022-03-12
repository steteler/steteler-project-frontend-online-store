import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addToCart } from '../services/cartHandler';

export default class Card extends Component {
  render() {
    const { price, title, thumbnail, id } = this.props;
    return (
      <div data-testid="product">
        <div>
          <img src={ thumbnail } alt={ title } />
        </div>
        <h3>{title}</h3>
        <span>{`${price} R$`}</span>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ (event) => addToCart(event, id) }
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
