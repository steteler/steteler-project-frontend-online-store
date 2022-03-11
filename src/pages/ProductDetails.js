import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';

export default class ProductDetails extends Component {
  constructor(props) {
    super();
    const { match: { params: { id } } } = props;
    this.state = {
      productId: id,
      product: {},
    };
  }

  componentDidMount() {
    this.getProductDetailsProcess();
  }

  getProductDetailsProcess = async () => {
    const { productId } = this.state;
    const result = await getProductDetails(productId);
    this.setState({ product: result });
    console.log(result);
  }

  render() {
    const { product: { title, thumbnail } } = this.state;
    return (
      <div data-testid="product-detail-name">
        <h1>{title}</h1>
        <div><img src={ thumbnail } alt={ title } /></div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.object,
}.isRequired;
