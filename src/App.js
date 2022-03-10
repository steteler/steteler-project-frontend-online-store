import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import './App.css';

class App extends Component {
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
        <SearchBar
          inputSearch={ inputSearch }
          onInputChange={ this.onInputChange }
        />
      </div>
    );
  }
}

export default App;
