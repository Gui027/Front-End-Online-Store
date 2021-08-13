import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormAddComment from '../Components/FormAddComment';
import Comments from '../Components/Comments';
import ShoppingCartIcon from '../Imgs/shopping-cart-solid.svg';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetail: undefined,
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

  getProductComments() {
    const { match, productComments } = this.props;
    const { id } = match.params;
    return (
      productComments
        .filter((productComment) => productComment.productId === id)
    );
  }

  render() {
    const { productDetail } = this.state;
    const { match, setProductComments, shoppingCart } = this.props;
    const { id } = match.params;
    if (productDetail !== undefined) {
      return (
        <div>
          <div>
            <h1 data-testid="product-detail-name">
              { productDetail.title }
            </h1>
            <p>{ productDetail.price }</p>
            <img src={ productDetail.thumbnail } alt={ productDetail.title } />
            <h2>Especificação Técnica</h2>
            <ul>
              <li>{ productDetail.price }</li>
            </ul>
          </div>
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <img className="cart-icon" alt="cart icon" src={ ShoppingCartIcon } />
          </Link>
          <button
            type="submit"
            data-testid="product-detail-add-to-cart"
            onClick={ () => {
              const ide = id;
              shoppingCart.push({
                title: productDetail.title,
                id: ide,
              });
            } }
          >
            Adicionar ao Carrinho
          </button>
          <FormAddComment id={ id } onSubmit={ setProductComments } />
          {
            this.getProductComments().length !== 0
            && <Comments productComments={ this.getProductComments() } />
          }
        </div>
      );
    }
    return (
      <p>Carregando...</p>
    );
  }
}

ProductDetails.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  condition: PropTypes.string,
  id: PropTypes.string,
  setProductComments: PropTypes.func,
  productComments: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;
