import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ShoppingCartIcon from '../Imgs/shopping-cart-solid.svg';

export default class ShoppingCart extends Component {
  elementShoppingCartEmpty() {
    return (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    );
  }

  render() {
    const { shoppingCart } = this.props;
    const emptyCart = (shoppingCart.length === 0);

    return (
      <div>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <img className="cart-icon" alt="cart icon" src={ ShoppingCartIcon } />
        </Link>
        {emptyCart && this.elementShoppingCartEmpty()}
        <div>
          {
            shoppingCart.map((product, i) => {
              const array = shoppingCart.filter((p) => p.id === product.id);
              const cont = array.length;
              if (i > 0 && product.id === shoppingCart[i - 1].id) {
                return undefined;
              }
              return (
                <div key={ product.title }>
                  <p data-testid="shopping-cart-product-name">{ product.title }</p>
                  <p data-testid="shopping-cart-product-quantity">{ cont }</p>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  shoppingCart: PropTypes.arrayOf(PropTypes.object).isRequired,
};
