import React, { Component } from "react";
import CreateFacture from "./components/CreateFacture";
import FactureList from "./components/FactureList";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <>
      <h3 className="text-center mt-5">Gestion des factures</h3>
      <p className="text-center">Ajouter, modifier et supprimer des factures</p>
      <div id="parent" className="container d-flex justify-content-center align-items-center p-5 flex-column">
        <CreateFacture />
        <FactureList />
      </div>
      </>
    );
  }
}

export default App;
