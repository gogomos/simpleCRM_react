import React, { Component } from 'react';

export class AjouterClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomClient: '',
            adresse: '',
            telephone: '',
            email: '',
            client: {},
            
        };
    }

    nameChange = (event) => {
        this.setState({ nomClient: event.target.value });
    }

    adresseChange = (event) => {
        this.setState({ adresse: event.target.value });
    }

    telephoneChange = (event) => {
        this.setState({ telephone: event.target.value });
    }

    emailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    clientInfo = (event) => {
        event.preventDefault();
        const client = {
            nomClient: this.state.nomClient,
            adresse: this.state.adresse,
            telephone: this.state.telephone,
            email: this.state.email
        };
        this.setState({ client });
        if(JSON.parse(localStorage.getItem('clients')) === null){
            localStorage.setItem('clients', JSON.stringify([client]));
        }else if(JSON.parse(localStorage.getItem('clients')).length === 0){
            localStorage.setItem('clients', JSON.stringify([client]));
        }else{
            localStorage.setItem('clients', JSON.stringify([...JSON.parse(localStorage.getItem('clients')), client]));
        }
    }

    componentDidUpdate() {
        if (this.state.client.nomClient) {
            alert(`Client: ${this.state.client.nomClient} ajouté avec succès!`);
            window.location.reload();
            this.props.closeModal();
        }
    }

    

    render() {
        return (
            <div id="myDiv" style={{border:"1px solid black", borderRadius:"10px", padding:"30px", position:'absolute',left:"40%", bottom:"20%", backgroundColor:"white"}}>
                <button
                    type="button"
                    className="btn-close"
                    onClick={this.props.closeModal}
                    aria-label="Close"
                ></button> 
                <form>
                    <div className="form-group">
                        <label htmlFor="nomClient">Nom Client</label>
                        <input type="text" className="form-control" id="nomClient" onChange={this.nameChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="adresse">Adresse</label>
                        <input type="text" className="form-control" id="adresse" onChange={this.adresseChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="telephone">Telephone</label>
                        <input type="number" min="0" className="form-control" id="telephone" onChange={this.telephoneChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={this.emailChange}/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
        
                    <button type="submit" className="btn btn-primary" onClick={this.clientInfo}>Submit</button>
                </form>
            </div>
        );
    }
}

export default AjouterClient;