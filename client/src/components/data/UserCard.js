import "../market/Card.css";

import React, { Component } from "react";

import inkfish from "../../images/inkfish.png";

import Purchasing from "../market/Purchasing";

import Button from "@material-ui/core/Button";

//npm i @material-ui/core --save
//npm install react-router-dom

class UserCard extends Component {
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

  handleChangeStatus = () => {
    console.log("Buy", this.state.id);
    console.log("account:", this.props.drizzleState.accounts);
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.SeabyBase;
    const stackId = contract.methods["changeForSaleStatus"].cacheSend(this.state.id, {
      from: drizzleState.accounts[0],
      gas: 3000000
    });

    this.setState({ stackId, id: this.state.id });
  };
  changeSaleStatus = curStatus => {
    return curStatus ? "=>Not for sale" : "=>For sale";
  };
  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const { transactions, transactionStack } = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] && transactions[txHash].status}`;
  };
  
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
            <Button 
              to="/open-collective"
              position="right-bottom"
              href="#"
              onClick={this.handleChangeStatus}
              className="btn btn-lg btn-primary"
            >
              {this.changeSaleStatus(creature.forSale)}
            </Button>
            <div>{this.getTxStatus()}</div>
          </div>
        </div>
      );
    }
  }
}

export default UserCard;
