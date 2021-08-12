import React, { Component } from 'react';
import * as api from '../services/api';

export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productDetail: undefined,
    };
    // this.requestProductDetail = this.requestProductDetail.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    api.getProductsFromCategoryAndQuery(id, undefined)
      .then((apiSearch) => {
        this.setState({
          productDetail: apiSearch,
        });
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
