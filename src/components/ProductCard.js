import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCard extends Component {
  render() {
    const { product, product: { price, title, thumbnail }, addItemToCart } = this.props;
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
          onClick={ (event) => {
            event.preventDefault();
            addItemToCart(product, 1);
          } }
        >
          Adicionar ao carrinho
        </button>
        <hr />
      </div>
    );
  }
}

ProductCard.propTypes = {
  price: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
