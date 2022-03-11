import React, { Component } from 'react';

export default class Card extends Component {
  render() {
    const { price, title, thumbnail } = this.props;

    return (
      <div data-testid="product">
        <div>
          <img src={ thumbnail } alt={ title } />
        </div>
        <h3>{title}</h3>
        <span>{price}</span>
      </div>
    );
  }
}
