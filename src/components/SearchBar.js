import React, { Component } from 'react';
import PropType from 'prop-types';

class SearchBar extends Component {
  render() {
    const {
      inputSearch,
      onInputChange,
    } = this.props;
    return (
      <div>
        <input
          name="inputSearch"
          type="text"
          onChange={ onInputChange }
          value={ inputSearch }
        />
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
};

export default SearchBar;
