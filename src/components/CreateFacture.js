import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AjouterDetailsFacture from "./AjouterDetailsFacture";
import ArticleList from "./ArticleList";

class CreateFacture extends Component {
  handleAjouterFacture = () => {
    const factureDetails = JSON.parse(localStorage.getItem('factureDetails')) || {};
    const articles = JSON.parse(localStorage.getItem('articlesItemes')) || [];

    if (!factureDetails.id || articles.length === 0) {
      alert("Veuillez remplir tous les détails de la facture et ajouter des articles.");
      return;
    }

    const factures = JSON.parse(localStorage.getItem('factures')) || [];
    const newFactures = [...factures, { ...factureDetails, articles }];
    localStorage.setItem('factures', JSON.stringify(newFactures));
    localStorage.removeItem('factureDetails');
    localStorage.removeItem('articlesItemes');

    this.props.updateFactures(newFactures);

    alert("Facture ajoutée avec succès !");
    this.props.clearForm();
    this.props.clearTable();
  }

  render() {
    return (
      <div>
        <AjouterDetailsFacture clearFormTrigger={this.props.clearFormTrigger} />
        <ArticleList clearTableTrigger={this.props.clearTableTrigger} />
        <div className="col-auto d-flex justify-content-end mb-3">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleAjouterFacture}
          >
            Ajouter Facture
          </button>
        </div>
      </div>
    );
  }
}

export default CreateFacture;
