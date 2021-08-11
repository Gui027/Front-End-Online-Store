import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import * as api from './services/api';

import './App.css';
import ShoppingCart from './Pages/ShoppingCart';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loadingCategories: true,
      categories: [],
      inputSearch: '',
      shoppingCart: [],
      search: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.searchRequest = this.searchRequest.bind(this);
  }

  componentDidMount() {
    api.getCategories()
      .then(
        (result) => this.setState({
          loadingCategories: false,
          categories: result,
        }),
      );

    // api.getProductsFromCategoryAndQuery('MLB5672', 'computador')
    //   .then((data) => console.log(data));
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  searchRequest() {
    const { inputSearch } = this.state;
    api.getProductsFromCategoryAndQuery('', inputSearch)
      .then((apiSearch) => {
        this.setState({
          search: apiSearch.results,
        });
      });
  }

  render() {
    const {
      categories,
      loadingCategories,
      inputSearch,
      shoppingCart,
      search } = this.state;

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
            />)
          }
        />
        <Route
          path="/cart"
          render={ () => (<ShoppingCart shoppingCart={ shoppingCart } />) }
        />
      </BrowserRouter>
    );
  }
}
