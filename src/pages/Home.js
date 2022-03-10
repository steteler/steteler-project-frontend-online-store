import React, { Component } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default class Home extends Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {
      inputSearch: '',
    };
  }

  onInputChange({ target }) {
    this.setState(() => ({
      [target.name]: target.value,
    }));
  }

  render() {
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
      </div>
    );
  }
}
