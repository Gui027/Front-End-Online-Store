import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comments extends Component {
  render() {
    const { productComments } = this.props;
    return (
      <div>
        { productComments.map((productComment) => {
          const { key, email, rating, comment } = productComment;
          return (
            <div key={ key }>
              <p>{ email }</p>
              <span>{ rating }</span>
              <p>{ comment }</p>
            </div>
          );
        })}
      </div>
    );
  }
}

Comments.propTypes = {
  productComments: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default Comments;
