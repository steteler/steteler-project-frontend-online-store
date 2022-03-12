import React, { Component } from 'react';
import { getProductDetails } from '../services/api';

export default class CartCard extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
    };
  }

  componentDidMount() {
    this.requestProduct();
  }

  requestProduct = () => {
    const { id } = this.props;
    const product = getProductDetails(id);
    this.setState({ product });
  }

  render() {
    const { product: { title } } = this.state;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
        <span data-testid="shopping-cart-product-quantity" />
      </div>
    );
  }
}
