import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductList extends Component {
  render() {
    const { produtos } = this.props;
    const { title, thumbnail, price } = produtos;
    return (
      <div data-testid="product">
        <span>{ title }</span>
        <img src={ thumbnail } alt="img" />
        <span>{ price }</span>
        <p>ola</p>
      </div>
    );
  }
}

ProductList.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
}.isRequired;
