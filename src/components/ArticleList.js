import React, { Component } from 'react';
// import ArticleItem from './ArticleItem';
import ArticleItem from './ArticteItem';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articleList: JSON.parse(localStorage.getItem('articlesItemes')) || [],
      count: JSON.parse(localStorage.getItem('articlesItemes'))?.length || 0,
    };
  }

  handleAjouterArticle = () => {
    const newArticle = {
      id: this.state.count + 1,
      name: '',
      quantity: 1,
      price: 0,
      discount: 0,
      totalPrice: 0,
    };

    const newArticleList = [...this.state.articleList, newArticle];
    this.setState((prevState) => ({
      articleList: newArticleList,
      count: prevState.count + 1,
    }));

    localStorage.setItem('articlesItemes', JSON.stringify(newArticleList));
  };

  deleteArticle = (id) => {
    const newArticleList = this.state.articleList.filter(article => article.id !== id);
    this.setState({ articleList: newArticleList });
    localStorage.setItem('articlesItemes', JSON.stringify(newArticleList));
  };

  updateArticle = (id, updatedData) => {
    const newArticleList = this.state.articleList.map(article => 
      article.id === id ? { ...article, ...updatedData } : article
    );
    this.setState({ articleList: newArticleList });
    localStorage.setItem('articlesItemes', JSON.stringify(newArticleList));
  };

  render() {
    return (
      <div className='justify-content-end'>
        <div className="col-auto d-flex justify-content-end mb-3">
          <button
            type="button"
            className="btn mt-4"
            id="ajouterArticle"
            onClick={this.handleAjouterArticle}
          >
            + Ajouter Article
          </button>
        </div>
        <table className="table-fill">
          <thead>
            <tr>
              <th className="text-left">Article</th>
              <th className="Quantité text-left">Quantité</th>
              <th className="text-left">Prix</th>
              <th className="Remise text-left">Remise</th>
              <th className="text-left">Montant</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody className="table-hover" >
            {this.state.articleList.map((article) => (
              <ArticleItem
                key={article.id}
                article={article}
                deleteArticle={this.deleteArticle}
                updateArticle={this.updateArticle}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ArticleList;
