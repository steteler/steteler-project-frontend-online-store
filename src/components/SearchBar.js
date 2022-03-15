import React, { Component } from 'react';
import PropType from 'prop-types';
import '../css/SearchBar.css';

class SearchBar extends Component {
  render() {
    const {
      inputSearch,
      onInputChange,
      handleSearch,
    } = this.props;
    return (
      <div className="search-content">
        <div className="search-container">
          <input
            className="search-input"
            name="inputSearch"
            data-testid="query-input"
            type="text"
            onChange={ onInputChange }
            value={ inputSearch }
            placeholder="Search products..."
          />
          <button
            className="search-button"
            type="button"
            data-testid="query-button"
            onClick={ handleSearch }
          >
            Pesquisar
          </button>
        </div>
        { !inputSearch && (
          <p className="search-text" data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        ) }
      </div>
    );
  }
}

SearchBar.propTypes = {
  inputSearch: PropType.string.isRequired,
  onInputChange: PropType.func.isRequired,
  handleSearch: PropType.func.isRequired,
};

export default SearchBar;
