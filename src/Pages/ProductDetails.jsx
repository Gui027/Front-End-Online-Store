import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import ShoppingCartIcon from '../Imgs/shopping-cart-solid.svg';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetail: undefined,
      ShoppingCart: [],
      product: '',
    };
    this.getProductDetails = this.getProductDetails.bind(this);
  }

  componentDidMount() {
    this.getProductDetails();
  }

  getProductDetails() {
    const { match, search } = this.props;
    const { id } = match.params;
    this.setState({
      productDetail: search.filter((product) => product.id === id)[0],
    });
  }

  addToCart = (addProduct) => {
    const { ShoppingCart } = this.state;
    ShoppingCart.push(addProduct.product);
    console.log(ShoppingCart);
    this.setState({ ShoppingCart });
  };

  thisProduct = () => {
    const { location: { state: product } } = this.props;
    this.setState({ product });
  }

  render() {
    const { ShoppingCart, product } = this.state;
    const { productDetail } = this.state;
    const { match } = this.props;
    const { params } = match;
    const { input } = params;
    if (productDetail !== undefined) {
      return (
        <div>
          <h1 data-testid="shopping-cart-product-name">
            { productDetail.title }
          </h1>
          <p>{ productDetail.price }</p>
          <img src={ productDetail.thumbnail } alt={ productDetail.title } />
          <h2>Especificação Técnica</h2>
          <ul>
            <li>{ productDetail.price }</li>
          </ul>
          <Link
            to={ { pathname: '/shop', state: { ShoppingCart } } }
            data-testid="shopping-cart-button"
          >
            <img className="cart-icon" alt="cart icon" src={ ShoppingCartIcon } />
            Carrinho de compras com
            <span data-testid="shopping-cart-product-quantity">
              {` ${ShoppingCart.length} `}

            </span>
            itens
          </Link>
          <h1 data-testid="product-detail-name">{input}</h1>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addToCart(product) }
          >
            Adicionar ao Carrinho
          </button>
        </div>
      );
    }
    return (
      <Route>
        <div>
          <p>Carregando...</p>
        </div>
      </Route>
    );
  }
}

ProductDetails.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  condition: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
