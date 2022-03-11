import React, { Component } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import * as api from '../services/api';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      inputSearch: '',
      categories: [],
    };
  }

  componentDidMount() {
    this.requestCategories();
  }

  requestCategories = async () => {
    const response = await api.getCategories();
    this.setState({ categories: response });
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
    } = this.state;
    return (
      <div>
        <Header />
        <SearchBar
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
      </div>
    );
  }
}
