import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import * as api from './services/api';
import './App.css';
import ShoppingCart from './Pages/ShoppingCart';
import ProductDetails from './Pages/ProductDetails';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loadingCategories: true,
      categories: [],
      inputSearch: '',
      shoppingCart: [],
      search: [],
      categoryFilter: '',
      categoryFilterOld: '',
      productComments: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchRequest = this.searchRequest.bind(this);
    this.setProductComments = this.setProductComments.bind(this);
  }

  componentDidMount() {
    api.getCategories()
      .then(
        (result) => this.setState({
          loadingCategories: false,
          categories: result,
        }),
      );
  }

  componentDidUpdate() {
    const { categoryFilter, categoryFilterOld } = this.state;
    if (categoryFilter !== categoryFilterOld) {
      this.searchRequest();
      this.refleshCategoryFilterState();
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  setProductComments(comment) {
    this.setState(({ productComments }) => ({
      productComments: [...productComments, comment] }));
  }

  searchRequest() {
    const { inputSearch, categoryFilter } = this.state;
    api.getProductsFromCategoryAndQuery(categoryFilter, inputSearch)
      .then((apiSearch) => {
        this.setState({
          search: apiSearch.results,
        });
      });
  }

  refleshCategoryFilterState() {
    const { categoryFilter } = this.state;
    this.setState({
      categoryFilterOld: categoryFilter,
    });
  }

  render() {
    const {
      categories,
      loadingCategories,
      inputSearch,
      shoppingCart,
      search,
      productComments } = this.state;

    return (
      <BrowserRouter>

        <Route
          exact
          path="/"
          render={
            () => (<MainPage
              categories={ categories }
              loadingCategories={ loadingCategories }
              handleChange={ this.handleChange }
              inputSearch={ inputSearch }
              searchRequest={ this.searchRequest }
              search={ search }
              shoppingCart={ shoppingCart }
            />)
          }
        />

        <Route
          path="/cart"
          render={ () => (<ShoppingCart shoppingCart={ shoppingCart } />) }
        />

        <Route
          exact
          path="/productDetails/:id"
          render={ (props) => {
            if (props) {
              return (
                <ProductDetails
                  { ...props }
                  inputSearch={ inputSearch }
                  search={ search }
                  setProductComments={ this.setProductComments }
                  productComments={ productComments }
                  shoppingCart={ shoppingCart }
                />
              );
            }
          } }
        />

      </BrowserRouter>
    );
  }
}
