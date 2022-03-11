import React, { Component } from 'react';
import PropType from 'prop-types';

class SearchBar extends Component {
  render() {
    const {
      inputSearch,
      onInputChange,
      handleSearch,
    } = this.props;
    return (
      <div>
        <input
          name="inputSearch"
          data-testid="query-input"
          type="text"
          onChange={ onInputChange }
          value={ inputSearch }
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ handleSearch }
        >
          Pesquisar

        </button>
        { !inputSearch && (
          <h2 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h2>
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
