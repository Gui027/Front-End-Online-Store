import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShoppingCartIcon from '../Imgs/shopping-cart-solid.svg';
import CategoryList from '../Components/CategoryList';
import Loading from '../Components/Loading';
import ProductList from '../Components/ProductList';
import * as api from '../services/api';
//
class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: undefined,
    };
    this.printList = this.printList.bind(this);
  }

  printList(search) {
    return search.map((product) => {
      if (search.length !== 0) {
        return (<ProductList
          key={ product.title }
          produtos={ product }
        />);
      }
      return <p key="0">Nenhum produto foi encontrado</p>;
    });
  }

  render() {
    const { inputSearch, categories, loadingCategories, handleChange } = this.props;
    const { search } = this.state;
    const loadingElement = <Loading />;
    return (
      <div className="main">
        <div className="category-list">
          <h2 className="title-category-list">Categorias:</h2>
          {loadingCategories
            ? loadingElement
            : <CategoryList categories={ categories } />}
        </div>
        <div className="search">
          <label htmlFor="input-search" data-testid="home-initial-message">
            <input
              data-testid="query-input"
              type="text"
              value={ inputSearch }
              name="inputSearch"
              id="input-search"
              onChange={ handleChange }
            />
            <button
              data-testid="query-button"
              type="submit"
              className="btn btn-default"
              onClick={ () => {
                api.getProductsFromCategoryAndQuery('', inputSearch)
                  .then((apiSearch) => {
                    this.setState({
                      search: apiSearch.results,
                    });
                  });
              } }
            >
              Pesquisar

            </button>
            Digite algum termo de pesquisa ou escolha uma categoria.
          </label>
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <img className="cart-icon" alt="cart icon" src={ ShoppingCartIcon } />
          </Link>
          { search ? this.printList(search) : <p> </p> }
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  ).isRequired,
  loadingCategories: PropTypes.bool.isRequired,
  inputSearch: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default MainPage;
