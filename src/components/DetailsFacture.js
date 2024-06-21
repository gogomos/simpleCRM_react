import React, { Component } from 'react'

export class DetailsFacture extends Component {
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
               <div class="form-group">
                   <label for="nomClient">Nom Client</label>
                   <input type="text" class="form-control" id="nomClient" />
               </div>
               <div class="form-group">
                   <label for="adresse">Adresse</label>
                   <input type="text" class="form-control" id="adresse" />
               </div>
               <div class="form-group">
                   <label for="telephone">Telephone</label>
                   <input type="number" min="0"class="form-control" id="telephone" />
               </div>
               <div class="form-group">
                   <label for="exampleInputEmail1">Email address</label>
                   <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                   <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
               </div>
       
               <button type="submit" class="btn btn-primary">Submit</button>
           </form>
       </div>
    )
  }
}

export default DetailsFacture

