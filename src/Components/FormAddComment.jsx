import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormAddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.id,
      email: '',
      rating: 0,
      comment: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit() {
    const { productId, email, rating, comment } = this.state;
    if (email !== '') {
      const { onSubmit } = this.props;
      const newComment = {
        productId,
        email,
        rating,
        comment,
        key: Date.now(),
      };
      onSubmit(newComment);
      this.setState({
        email: '',
        rating: 0,
        comment: '',
      });
    }
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  renderEmailInput() {
    const { email } = this.state;
    return (
      <div className="form-input">
        <label htmlFor="email">
          <input
            name="email"
            placeholder="Email"
            id="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }

  renderRatingInput() {
    const { rating } = this.state;
    return (
      <div className="form-input">
        <label htmlFor="rating">
          <input
            id="rating"
            name="rating"
            type="number"
            step={ 1 }
            min={ 0 }
            max={ 5 }
            value={ rating }
            onChange={ this.handleChange }
          />
          Avaliação
        </label>
      </div>
    );
  }

  renderCommentInput() {
    const { comment } = this.state;
    return (
      <div className="form-input">
        <label htmlFor="comment">
          <textarea
            name="comment"
            placeholder="Mensagem (opcional)"
            id="comment"
            value={ comment }
            onChange={ this.handleChange }
            data-testid="product-detail-evaluation"
          />
        </label>
      </div>
    );
  }

  renderSubmitButton() {
    return (
      <div className="flex">
        <button
          type="button"
          onClick={ this.handleSubmit }
        >
          Avaliar
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="add-comment">
        <form className="add-comment-body">
          {this.renderEmailInput()}
          {this.renderRatingInput()}
          {this.renderCommentInput()}
          {this.renderSubmitButton()}
        </form>
      </div>
    );
  }
}

FormAddComment.propTypes = {
  id: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormAddComment;
