import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import products from '../data'; // Ensure products data is available

class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: null,
      quantity: 1,
      isDisabled: false,
    };
  }

  handleProductChange = (event) => {
    const selectedProductId = parseInt(event.target.value);
    const selectedProduct = products.find(product => product.id === selectedProductId);
    this.setState({ selectedProduct }, () => {
      this.updateParent();
    });
  }

  handleQuantityChange = (event) => {
    this.setState({ quantity: parseInt(event.target.value) }, () => {
      this.updateParent();
    });
  }

  calculateDiscount = (quantity) => {
    if (quantity > 100) return 40;
    if (quantity > 50) return 30;
    if (quantity > 20) return 20;
    if (quantity > 5) return 10;
    if (quantity > 1) return 5;
    return 0;
  }

  handleCheckClick = () => {
    this.setState(prevState => ({ isDisabled: !prevState.isDisabled }));
  };

  updateParent = () => {
    const { article, updateArticle } = this.props;
    const { selectedProduct, quantity } = this.state;

    const discount = this.calculateDiscount(quantity);
    const price = selectedProduct ? selectedProduct.price : 0;
    const totalPrice = price * quantity * (1 - discount / 100);

    updateArticle(article.id, {
      name: selectedProduct ? selectedProduct.name : '',
      quantity,
      price,
      discount,
      totalPrice,
    });
  };

  render() {
    const { article, deleteArticle } = this.props;
    const { selectedProduct, quantity, isDisabled } = this.state;

    return (
      <tr>
        <td className="text-left">
          <select 
            className="form-select" 
            aria-label="Default select example" 
            onChange={this.handleProductChange}
            disabled={isDisabled}
          >
            <option value="">Open this select menu</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </td>
        <td className="text-left">
          <input
            type="number"
            value={quantity}
            onChange={this.handleQuantityChange}
            className="form-control"
            min="0"
            disabled={isDisabled}
          />
        </td>
        <td className="text-left">{selectedProduct ? `${selectedProduct.price}DH` : '-'}</td>
        <td className="text-left">{this.calculateDiscount(quantity)}%</td>
        <td className="text-left">{selectedProduct ? `${(selectedProduct.price * quantity * (1 - this.calculateDiscount(quantity) / 100)).toFixed(2)}DH` : '-'}</td>
        <td className="text-left">
          <div className="form-check col-auto d-flex justify-content-around">
            <button 
              id='checked' 
              className={`btn btn-link p-0 ${isDisabled ? 'btn-checked' : 'not-checked'}`} 
              onClick={this.handleCheckClick}
            >
              <FontAwesomeIcon icon={faSquareCheck} />
            </button>
            <button 
              id='delete'
              onClick={() => deleteArticle(article.id)} 
              className="btn btn-link p-0"
              disabled={isDisabled}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </td>
      </tr>
    );
  }
}

export default ArticleItem;
