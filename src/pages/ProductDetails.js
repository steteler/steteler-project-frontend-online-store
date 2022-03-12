import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';
import Header from '../components/Header';
import { addToCart } from '../services/cartHandler';

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
  }

  render() {
    const { product: { title, thumbnail, productId } } = this.state;
    return (
      <div data-testid="product-detail-name">
        <Header />
        <h1>{title}</h1>
        <div><img src={ thumbnail } alt={ title } /></div>
        <button
          onClick={ (event) => addToCart(event, productId) }
          type="button"
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.object,
}.isRequired;
