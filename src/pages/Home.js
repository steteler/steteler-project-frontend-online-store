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
    const { inputSearch } = this.state;
    const data = await api.getProductsFromCategoryAndQuery('', inputSearch);
    const result = data.results;
    this.setState({ searchResults: result, isResultEmpty: result.length === 0 });
  }

  onInputChange = ({ target }) => {
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
                  value={ name }
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
