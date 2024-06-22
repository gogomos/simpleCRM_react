import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class DetailsFacture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      client: null,
    };
  }

  componentDidMount() {
    const { facture } = this.props;
    if (facture && facture.client) {
      const clients = JSON.parse(localStorage.getItem('clients')) || [];
      const client = clients.find(client => client.nomClient === facture.client);
      this.setState({ client });
    }
  }

  render() {
    const { facture, closeModal } = this.props;
    const { client } = this.state;

    if (!facture || !client) return null;

    const totalHT = facture.articles.reduce((acc, article) => acc + article.totalPrice, 0);
    const totalTVA = totalHT * 20 / 100;
    const totalTTC = totalHT + totalTVA;

    return (
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de la facture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>ID Facture:</strong> {facture.id}</p>
          <p><strong>Client:</strong> {facture.client}</p>
          <p><strong>Date:</strong> {facture.date}</p>
          <p><strong>Montant H.T:</strong> $ {totalHT.toFixed(2)}</p>
          <p><strong>TVA (20%):</strong> $ {totalTVA.toFixed(2)}</p>
          <p><strong>Montant TTC:</strong> $ {totalTTC.toFixed(2)}</p>
          <h5>Détails du client:</h5>
          <p><strong>Phone Number:</strong> {client.telephone}</p>
          <p><strong>Email:</strong> {client.email}</p>
          <p><strong>Address:</strong> {client.adresse}</p>
          <h5>Articles:</h5>
          <ul>
            {facture.articles.map((article, index) => (
              <li key={index}>
                {article.name}: {article.quantity} x ${article.price} = ${article.totalPrice.toFixed(2)}
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DetailsFacture;
