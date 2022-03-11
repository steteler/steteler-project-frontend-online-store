import React, { Component } from 'react';
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
      selectedCategory: '',
    };
  }

  componentDidMount() {
    this.requestCategories();
  }

  requestCategories = async () => {
    const response = await api.getCategories();
    this.setState({ categories: response });
  }

  search = async () => {
    const { inputSearch, selectedCategory } = this.state;
    const data = await api.getProductsFromCategoryAndQuery(
      selectedCategory.id,
      inputSearch,
    );

    const result = data.results;
    console.log(inputSearch);
    this.setState({ searchResults: result, isResultEmpty: result.length === 0 });
  }

  onInputChange = ({ target }) => {
    console.log(target.value);
    this.setState(() => ({
      [target.name]: target.value,
    }));
  }

  render() {
    const { categories } = this.state;
    const {
      inputSearch,
      searchResults,
      isResultEmpty,
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
                  id={ id }
                  type="radio"
                  value={ id }
                  name="selectedCategory"
                  onChange={ this.onInputChange }
                />
                {name}
              </label>
            </div>
          ))}
        </div>

        <div>
          { !isResultEmpty
            ? searchResults.map((product) => <Card key={ product.id } { ...product } />)
            : 'Nenhum produto foi encontrado'}
        </div>
      </div>
    );
  }
}
