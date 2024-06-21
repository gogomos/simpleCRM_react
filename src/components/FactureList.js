import React, { Component } from 'react';
import DetailsFacture from './DetailsFacture';

class FactureList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      factures: JSON.parse(localStorage.getItem('factures')) || [],
      selectedFacture: null,
    };
  }

  render() {
    return (
      <div className='mt-5'>
        <h1>Liste des factures</h1>
        <table className="table-fill ">
          <thead>
            <tr>
              <th className="text-left">Id Facture</th>
              <th className="Quantité text-left">Client</th>
              <th className="text-left">Montant H.T</th>
              <th className="Remise text-left">TVA</th>
              <th className="text-left">Montant TTC</th>
           
            </tr>
          </thead>
          <tbody className="table-hover">
            {this.state.factures.map((facture, index) => {
              const totalHT = facture.articles.reduce((acc, article) => acc + article.totalPrice, 0);
              const totalTVA = totalHT * 20 / 100;
              const totalTTC = totalHT + totalTVA;

              return (
                <tr key={index}>
                  <td className="text-left">{facture.id}</td>
                  <td className="text-left">{facture.client}</td>
                  <td className="text-left">$ {totalHT.toFixed(2)}</td>
                  <td className="text-left">20 %</td>
                  <td className="text-left">$ {totalTTC.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.showModal && <DetailsFacture facture={this.state.selectedFacture} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default FactureList;
