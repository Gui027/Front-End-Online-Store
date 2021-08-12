import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryList extends Component {
  render() {
    const { categories, handleChange } = this.props;
    return (
      <div>
        <ul>
          { categories
            .map((category) => (
              <div key={ category.id }>
                <label
                  htmlFor={ `category-${category.name}` }
                  data-testid="category"
                >
                  <input
                    type="radio"
                    name="categoryFilter"
                    value={ category.id }
                    id={ `category-${category.name}` }
                    onChange={ handleChange }
                  />
                  { category.name }
                </label>
              </div>
            ))}
        </ul>
      </div>
    );
  }
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default CategoryList;
