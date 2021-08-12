import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  render() {
    const { productDetail } = this.state;
    if (productDetail !== undefined) {
      return (
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
}.isRequired;
