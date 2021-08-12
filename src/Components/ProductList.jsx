import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cont: 0,
    };
    this.addCart = this.addCart.bind(this);
    this.removeCart = this.removeCart.bind(this);
  }

  addCart() {
    this.setState((estadoAnterior) => ({
      cont: estadoAnterior.cont + 1,
    }));
  }

  removeCart() {
    this.setState((estadoAnterior) => ({
      cont: estadoAnterior.cont - 1,
    }));
  }

  render() {
    const { cont } = this.state;
    const { produtos } = this.props;
    const { title, thumbnail, price, id } = produtos;
    return (
      <div id={ id }>
        <Link
          to={ `/productDetails/${id}` }
        >
          <div data-testid="product-detail-link">
            <div
              data-testid="product"
            >
              <span>
                { title }
              </span>
              <img src={ thumbnail } alt="img" />
              <span>{ price }</span>
            </div>
          </div>
        </Link>
        <button type="button" onClick={ this.removeCart }>-1</button>
        <button
          type="submit"
          onClick={ (event) => console.log(event.target.parentElement.id) }
        >
          Adicionar ao Carrinho
          <p>{ cont }</p>
        </button>
        <button type="button" onClick={ this.addCart }>+1</button>
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
