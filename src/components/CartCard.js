import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';

export default class CartCard extends Component {
  constructor() {
    super();
    this.state = {
      thumbnail: '',
    };
  }

  componentDidMount() {
    this.requestProduct();
  }

  requestProduct = async () => {
    const { product: { id } } = this.props;
    const product = await getProductDetails(id);
    this.setState({ thumbnail: product.thumbnail });
  }

  render() {
    const { thumbnail } = this.state;
    const { product, product: { title }, quantity, updateItem } = this.props;
    return (
      <div>
        <img src={ thumbnail } alt={ title } />
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
        <button
          onClick={ () => updateItem(product, quantity + 1) }
          data-testid="product-increase-quantity"
          type="button"
        >
          +
        </button>
        <span data-testid="shopping-cart-product-quantity">{quantity}</span>
        <button
          onClick={ () => updateItem(product, quantity - 1) }
          data-testid="product-decrease-quantity"
          type="button"
        >
          -
        </button>
      </div>
    );
  }
}

CartCard.propTypes = {
  quantity: PropTypes.number,
  updateItem: PropTypes.func,
}.isRequired;
