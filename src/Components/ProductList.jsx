import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
  render() {
    const { produtos } = this.props;
    const { title, thumbnail, price, id } = produtos;
    return (
      <div>
        <Link
          to={ `/productDetails/${id}` }
        >
          <div data-testid="product-detail-link">
            <div
              data-testid="product"
              id={ id }
            >
              <span data-testid="shopping-cart-product-name">
                { title }
              </span>
              <img src={ thumbnail } alt="img" />
              <span>{ price }</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

ProductList.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  condition: PropTypes.string,
}.isRequired;
