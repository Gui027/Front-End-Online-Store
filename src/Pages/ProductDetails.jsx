import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormAddComment from '../Components/FormAddComment';
import Comments from '../Components/Comments';


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

  getProductComments() {
    const { match, productComments } = this.props;
    const { id } = match.params;
    return (
      productComments
        .filter((productComment) => productComment.productId === id)
    );
    
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
