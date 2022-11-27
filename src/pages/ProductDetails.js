import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';
import Header from '../components/Header';
import { addToCart, saveLocalStorageRating,
  getLocalStorageRating, getCartItemsQuantity } from '../services/localStorageHandler';

export default class ProductDetails extends Component {
  constructor(props) {
    super();
    const { match: { params: { id } } } = props;
    this.state = {
      productId: id,
      product: {},
      detailEmail: '',
      productRate: '',
      detailEvaluation: '',
      rates: [],
      cartSize: getCartItemsQuantity(),
    };
  }

  componentDidMount() {
    this.getProductDetailsProcess();
    this.getProductRatings();
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  getProductDetailsProcess = async () => {
    const { productId } = this.state;
    const result = await getProductDetails(productId);
    this.setState({ product: result });
  }

  saveRating = (event) => {
    event.preventDefault();
    const { productId, detailEmail, productRate, detailEvaluation } = this.state;
    const rateInfo = { productId, detailEmail, productRate, detailEvaluation };
    saveLocalStorageRating(rateInfo);
    this.getProductRatings();
    this.setState({ detailEmail: '', productRate: '', detailEvaluation: '' });
  }

  getProductRatings = () => {
    const { productId } = this.state;
    const ratings = getLocalStorageRating();
    this.setState({ rates: ratings.filter(({ productId: id }) => id === productId) });
  }

  addItemToCart = (product, quantity) => {
    addToCart(product, quantity);
    this.setState({ cartSize: getCartItemsQuantity() });
  }

  render() {
    const { product, product: { title, thumbnail }, detailEmail,
      detailEvaluation, productRate, rates, cartSize } = this.state;
    return (
      <div data-testid="product-detail-name">
        <Header cartSize={ cartSize } />
        <div>
          <div><img src={ thumbnail } alt={ title } /></div>
          <h1>{title}</h1>
          <button
            onClick={ (event) => {
              event.preventDefault();
              this.addItemToCart(product, 1);
            } }
            type="button"
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
        </div>
        <div>
          <form onSubmit={ this.saveRating }>
            <label htmlFor="product-detail-email">
              <div>Email:</div>
              <input
                id="product-detail-email"
                name="detailEmail"
                type="email"
                data-testid="product-detail-email"
                value={ detailEmail }
                onChange={ this.onInputChange }
              />
            </label>
            <div>
              <div>Avaliação:</div>
              <input
                id="1-rating"
                name="productRate"
                type="checkbox"
                value="1"
                checked={ productRate >= '1' }
                data-testid="1-rating"
                onChange={ this.onInputChange }
              />
              <input
                id="2-rating"
                name="productRate"
                type="checkbox"
                value="2"
                checked={ productRate >= '2' }
                data-testid="2-rating"
                onChange={ this.onInputChange }
              />
              <input
                id="3-rating"
                name="productRate"
                type="checkbox"
                value="3"
                checked={ productRate >= '3' }
                data-testid="3-rating"
                onChange={ this.onInputChange }
              />
              <input
                id="4-rating"
                name="productRate"
                type="checkbox"
                value="4"
                checked={ productRate >= '4' }
                data-testid="4-rating"
                onChange={ this.onInputChange }
              />
              <input
                id="5-rating"
                name="productRate"
                type="checkbox"
                value="5"
                checked={ productRate >= '5' }
                data-testid="5-rating"
                onChange={ this.onInputChange }
              />
            </div>
            <label htmlFor="product-detail-evaluation">
              <div>Descrição:</div>
              <textarea
                id="product-detail-evaluation"
                name="detailEvaluation"
                data-testid="product-detail-evaluation"
                value={ detailEvaluation }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="submit"
              data-testid="submit-review-btn"
            >
              Avaliar
            </button>
          </form>
          {rates.map(({
            detailEmail: dE,
            productRate: pR,
            detailEvaluation: dEv },
          index) => (
            <div key={ `${dE}+${index}` }>
              <div>
                <span>Email:</span>
                <span>{dE}</span>
              </div>
              <div>
                <span>Avaliação:</span>
                <span>{pR}</span>
              </div>
              <div>
                <span>Descrição:</span>
                <span>{dEv}</span>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.object,
}.isRequired;
