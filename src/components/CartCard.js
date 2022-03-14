import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';

const DECREASE = -1;
const INCREASE = 1;

export default class CartCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnail: '',
      product: props.product,
      availableQuantity: props.product.available_quantity,
      quantity: props.quantity,
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

  changeItemQuantity = (param) => {
    const { product, availableQuantity, quantity } = this.state;
    const { updateItem } = this.props;
    if (quantity + param > availableQuantity || quantity + param < 1) return;
    const result = quantity + param;
    this.setState({ quantity: result });
    updateItem(product, result);
  }

  render() {
    const { product: { title }, quantity, availableQuantity, thumbnail } = this.state;
    return (
      <div>
        <img src={ thumbnail } alt={ title } />
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
        <button
          onClick={ () => { this.changeItemQuantity(DECREASE); } }
          data-testid="product-decrease-quantity"
          type="button"
          disabled={ quantity <= 1 }
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">{quantity}</span>
        <button
          onClick={ () => this.changeItemQuantity(INCREASE) }
          data-testid="product-increase-quantity"
          type="button"
          disabled={ quantity >= availableQuantity }
        >
          +
        </button>
      </div>
    );
  }
}

CartCard.propTypes = {
  quantity: PropTypes.number,
  updateItem: PropTypes.func,
}.isRequired;
