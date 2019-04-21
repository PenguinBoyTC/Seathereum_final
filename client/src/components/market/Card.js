import "./Card.css";

import React, { Component } from "react";

import inkfish from "../../images/inkfish.png";

import Purchasing from "./Purchasing";

import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

//npm i @material-ui/core --save
//npm install react-router-dom

class Card extends Component {
  //state = { name: this.props.name, desc: this.props.desc };
  state = { dataKey: null, id: this.props.id };
  componentDidMount() {
    const { drizzle } = this.props;
  
    const contract = drizzle.contracts.SeabyBase;
   
    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods["getSeabyById"].cacheCall(this.state.id);

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey, id: this.state.id });
  }
  handleBuy = () => {
    console.log("Buy", this.state.id);
    console.log("account:", this.props.drizzleState.accounts);
  };
  renderBuy = saleStatus => {
    return saleStatus ? 
    <Button 
      
      to="/open-collective"
      position="right-bottom"
      href="#"
      onClick={this.handleBuy}
      className="btn btn-lg btn-primary"
    >
      Buy
    </Button> : <p>Not for sale</p>
  };
  renderPurchase() {
    return <div />;
  }
  render() {
    // get the contract state from drizzleState
    const { SeabyBase } = this.props.drizzleState.contracts;
    // using the saved `dataKey`, get the variable   we're interested in
    const getSeabyById = SeabyBase.getSeabyById[this.state.dataKey];

    if (!getSeabyById) {
      return <p>"Loading Seaby..."</p>;
    } else {
      const creature = getSeabyById.value;
      return (
        <div className="card text-center border-0 bg-light">
          <div className="front">
            <img className="card-img-top w-auto" src={inkfish} alt="" />
          </div>
          <div className="back card-body w-100 position-absolute">
            <h4 className="card-title">{this.state.name}</h4>
            <p className="card-text">{this.state.desc}</p>
          </div>
          <div>
            <Purchasing
              name={creature.name}
              birthTime={creature.birthTime}
              generation={creature.generation}
              forSale={creature.forSale}
              price={100 * this.state.id + 1}
            />
            {this.renderBuy(creature.forSale)}
          </div>
        </div>
      );
    }
  }
}

export default Card;
