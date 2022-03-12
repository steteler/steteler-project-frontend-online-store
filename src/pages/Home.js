import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import * as api from '../services/api';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      categories: [],
      searchResults: [],
      isResultEmpty: false,
      selectedCategoryId: '',
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
    // console.log(result);
    this.setState({ searchResults: result, isResultEmpty: result.length === 0 });
  }

  onInputChange = ({ target }) => {
    this.setState(() => ({
      [target.name]: target.value,
    }));
  }

  render() {
    const {
      inputSearch,
      searchResults,
      isResultEmpty,
      categories,
      selectedCategoryId,
    } = this.state;
    return (
      <div>
        <Header />
        <SearchBar
          handleSearch={ this.search }
          inputSearch={ inputSearch }
          onInputChange={ this.onInputChange }
        />
        <div>
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

        <div>
          { !isResultEmpty
            ? searchResults.map((product) => (
              <div key={ product.id }>
                <Link
                  to={ `/product-details/${product.id}` }
                  data-testid="product-detail-link"
                >
                  <Card product={ product } />
                </Link>
              </div>
            ))
            : <div>Nenhum produto foi encontrado</div>}
        </div>
      </div>
    );
  }
}
