import React from "react";

import {DrizzleContext} from 'drizzle-react';

class Generator extends React.Component {
  state = { stackId: null, nameBox: null };
  // componentDidUpdate() {
    
  //   const { drizzle, drizzleState } = this.props;
  //   console.log("state:", drizzle);
  //   console.log("state2:", drizzleState.contract);
  //   if (drizzleState.contract) {
  //     console.log("state3:", drizzleState.contract.Auction.events);
  //   }
  //   //console.log("state2:", drizzleState.contract.Auction.events);
  // }
  handleChange = e => {
    this.setState({nameBox: e.target.value});
  };
  handleClick = () => {
    // if the enter key is pressed, set the value with the string
    var value = this.state.nameBox;
    if (value) {
      this.createRandomSeaby(value);
    }
  };

  createRandomSeaby = name => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Auction;
    
    // let drizzle know we want to call the `set` method with `value`

    const stackId = contract.methods["createRandomSeaby"].cacheSend(name, {
      from: drizzleState.accounts[0],
      gas: 3000000
    });
    // save the `stackId` for later reference
    this.setState({ stackId });
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
    return (
      <div>
        <center>
          <h2>Give your creature a name:</h2>
          <input type="text" onChange={this.handleChange}/>
          <p>
            <button className="btn btn-primary my-2" onClick={this.handleClick}>Create</button>
          </p>
          <div>{this.getTxStatus()}</div>
        </center>
      </div>
    );
  }
}

export default () => (
  <DrizzleContext.Consumer>
    {(drizzleContext) => {
      const {drizzle, drizzleState, initialized} = drizzleContext;
      if (initialized)
        return <Generator drizzle={drizzle} drizzleState={drizzleState} />;
      else return 'Loading...';
    }}
  </DrizzleContext.Consumer>
);
