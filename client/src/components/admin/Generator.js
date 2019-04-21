import React from "react";

import {DrizzleContext} from 'drizzle-react';

class Generator extends React.Component {
  state = { stackId: null };
  
  updateDefaultAccount = async () => {
    const web3 = this.state.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({defaultAccount: accounts[0].toString()});
  };
  handleKeyDown = e => {
    // if the enter key is pressed, set the value with the string
    if (e.keyCode === 13) {
      this.createRandomSeaby(e.target.value);
    }
  };

  createRandomSeaby = name => {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.SeabyBase;
    
    // let drizzle know we want to call the `set` method with `value`

    console.log("name:", name);
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
        <h2>Give your creature a name:</h2>
        <input type="text" onKeyDown={this.handleKeyDown} />
        <div>{this.getTxStatus()}</div>
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
