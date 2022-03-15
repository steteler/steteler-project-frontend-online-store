import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import * as api from '../services/api';
import { addToCart, getCartItemsQuantity } from '../services/localStorageHandler';
import '../css/Home.css';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      categories: [],
      searchResults: [],
      isResultEmpty: false,
      selectedCategoryId: '',
      cartSize: getCartItemsQuantity(),
    };
  }

  componentDidMount() {
    this.requestCategories();
  }

  requestCategories = async () => {
    const categories = await api.getCategories();
    this.setState({ categories, selectedCategoryId: categories[0].id },
      () => this.search());
  }

  search = async () => {
    const { inputSearch, selectedCategoryId } = this.state;
    const data = await api.getProductsFromCategoryAndQuery(
      selectedCategoryId,
      inputSearch,
    );

    const result = data.results;
    this.setState({ searchResults: result, isResultEmpty: result.length === 0 });
  }

  onInputChange = ({ target }) => {
    this.setState(() => ({
      [target.name]: target.value,
    }));
  }

  addItemToCart = (product, quantity) => {
    addToCart(product, quantity);
    this.setState({ cartSize: getCartItemsQuantity() });
  }

  render() {
    const {
      inputSearch,
      searchResults,
      isResultEmpty,
      categories,
      selectedCategoryId,
      cartSize,
    } = this.state;
    return (
      <div className="home">
        <Header cartSize={ cartSize } />
        <SearchBar
          handleSearch={ this.search }
          inputSearch={ inputSearch }
          onInputChange={ this.onInputChange }
        />
        <main className="home-content">
          <div className="categories">
            {categories.map(({ id, name }) => (
              <div key={ id }>
                <label htmlFor={ id } data-testid="category">
                  <input
                    checked={ selectedCategoryId === id }
                    id={ id }
                    type="radio"
                    value={ id }
                    name="selectedCategoryId"
                    onChange={ this.onInputChange }
                  />
                  {name}
                </label>
              </div>
            ))}
          </div>

          <div className="home-items-container">
            { !isResultEmpty
              ? searchResults.map((product) => (
                <div key={ product.id }>
                  <Link
                    className="product-card"
                    to={ `/product-details/${product.id}` }
                    data-testid="product-detail-link"
                  >
                    <ProductCard
                      product={ product }
                      addItemToCart={ this.addItemToCart }
                    />
                  </Link>
                </div>
              ))
              : <div>Nenhum produto foi encontrado</div>}
          </div>
        </main>
      </div>
    );
  }
}
