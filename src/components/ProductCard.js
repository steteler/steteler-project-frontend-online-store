import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/ProductCard.css';

export default class ProductCard extends Component {
  render() {
    const {
      product,
      product: { price, title, thumbnail, shipping: { free_shipping: freeShipping } },
      addItemToCart,
    } = this.props;
    return (
      <div data-testid="product">
        <img className="product-card-thumbnail" src={ thumbnail } alt={ title } />
        {
          freeShipping && (
            <img
              className="free-shipping"
              data-testid="free-shipping"
              src="https://cdn-icons-png.flaticon.com/512/411/411776.png"
              alt="frete grátis"
            />
          )
        }
        <h3 className="product-card-title">{title}</h3>
        <span>{`${price} R$`}</span>
        <button
          className="product-card-add-button"
          type="button"
          data-testid="product-add-to-cart"
          onClick={ (event) => {
            event.preventDefault();
            addItemToCart(product, 1);
          } }
        >
          Adicionar ao carrinho
        </button>
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
