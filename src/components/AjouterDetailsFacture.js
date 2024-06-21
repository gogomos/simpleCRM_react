import React, { Component } from 'react';
import AjouterClient from './AjouterClient';

class AjouterDetailsFacture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAjouterClient: false,
      clients: [],
      idFacture: '',
      dateFacture: '',
      selectedClient: ''
    };
    this.ClientInput = React.createRef();
  }

  componentDidMount() {
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    this.setState({ clients });
  }

  handleSelectChange = (event) => {
    if (event.target.value === '3') {
      this.setState({ showAjouterClient: true });
      this.ClientInput.current.value = '';
    } else {
      this.setState({ selectedClient: event.target.value });
    }
  };

  closeModal = () => {
    this.setState({ showAjouterClient: false });
    const clients = JSON.parse(localStorage.getItem('clients') || '[]');
    this.setState({ clients });
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSaveDetails = () => {
    const { idFacture, dateFacture, selectedClient } = this.state;
    if (!idFacture || !dateFacture || !selectedClient) {
      alert("Veuillez remplir tous les détails de la facture.");
      return;
    }

    const factureDetails = { id: idFacture, date: dateFacture, client: selectedClient };
    localStorage.setItem('factureDetails', JSON.stringify(factureDetails));
  }

  render() {
    return (
      <div>
        <form className="row g-3 mb-5">
          <div>
            <label htmlFor="idFacture">ID Facture</label>
            <input
              type="text"
              className="form-control"
              id="idFacture"
              onChange={this.handleInputChange}
            />
          </div>
          <div >
            <label htmlFor="dateFacture">Date Facture</label>
            <input
              type="date"
              className="form-control"
              id="dateFacture"
              onChange={this.handleInputChange}
            />
          </div>
          <div >
            <label htmlFor="clients">Facture à</label>
            <select
              ref={this.ClientInput}
              className="form-select"
              aria-label="Default select example"
              onChange={this.handleSelectChange}
            >
              <option value="">Open this select menu</option>
              {this.state.clients.map((client, index) => (
                <option key={index} value={client.nomClient}>{client.nomClient}</option>
              ))}
              <option value="3">+ Ajouter Client</option>
            </select>
            {this.state.showAjouterClient && <AjouterClient closeModal={this.closeModal} />}
          </div>
        </form>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={this.handleSaveDetails}
        >
          Enregistrer les détails de la facture
        </button>
      </div>
    );
  }
}

export default AjouterDetailsFacture;
