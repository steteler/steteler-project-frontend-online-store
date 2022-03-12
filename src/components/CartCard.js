import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  requestProduct = async () => {
    const { id } = this.props;
    const product = await getProductDetails(id);
    this.setState({ product });
  }

  render() {
    const { product: { title } } = this.state;
    return (
      <div>
        <h3 data-testid="shopping-cart-product-name">{title}</h3>
      </div>
    );
  }
}

CartCard.propTypes = {
  id: PropTypes.string.isRequired,
};
