import React, { Component } from "react";
import CreateFacture from "./components/CreateFacture";
import FactureList from "./components/FactureList";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factures: JSON.parse(localStorage.getItem('factures')) || [],
      clearFormTrigger: false,
      clearTableTrigger: false,
    };
  }

  updateFactures = (newFactures) => {
    this.setState({ factures: newFactures });
    localStorage.setItem('factures', JSON.stringify(newFactures));
  }

  clearForm = () => {
    this.setState({ clearFormTrigger: !this.state.clearFormTrigger });
  }

  clearTable = () => {
    this.setState({ clearTableTrigger: !this.state.clearTableTrigger });
  }

  render() {
    return (
      <>
        <h3 className="text-center mt-5">Gestion des factures</h3>
        <p className="text-center">Ajouter, modifier et supprimer des factures</p>
        <div id="parent" className="container d-flex justify-content-center align-items-center p-5 flex-column">
          <CreateFacture
            updateFactures={this.updateFactures}
            clearForm={this.clearForm}
            clearTable={this.clearTable}
            clearFormTrigger={this.state.clearFormTrigger}
            clearTableTrigger={this.state.clearTableTrigger}
          />
          <FactureList factures={this.state.factures} />
        </div>
      </>
    );
  }
}

export default App;
