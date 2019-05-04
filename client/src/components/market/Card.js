import './Card.css';

import React, {Component} from 'react';

import inkfish from '../../images/inkfish.png';
import octopus from '../../images/octopus.png';
import turtle from '../../images/turtle.png';

import SeabyInfor from './SeabyInfor';

import Button from '@material-ui/core/Button';
const images = [inkfish, octopus, turtle];
//npm i @material-ui/core --save
//npm install react-router-dom

class Card extends Component {
  //state = { name: this.props.name, desc: this.props.desc };
  state = {dataKey: null, dataKey1: null, dataKey2: null, id: this.props.id};
  componentDidMount() {
    const {drizzle} = this.props;

    const contract = drizzle.contracts.Auction;

    // let drizzle know we want to watch the `myString` method
    const dataKey = contract.methods['getSeabyById'].cacheCall(this.state.id);
    const dataKey1 = contract.methods['ownerOf'].cacheCall(this.state.id);
    const dataKey2 = contract.methods['getFeaturesById'].cacheCall(
      this.state.id
    );

    // save the `dataKey` to local component state for later reference
    this.setState({dataKey, dataKey1, dataKey2, id: this.state.id});
  }
  handleBuy = () => {
    const {drizzle, drizzleState} = this.props;
    console.log('Buy', this.state.id);
    console.log('account:', drizzleState.accounts);
    const contract = drizzle.contracts.Auction;

    const stackId = contract.methods['buy'].cacheSend(this.state.id, {
      from: drizzleState.accounts[0],
      value: 1,
      gas: 3000000
    });
    // save the `stackId` for later reference
    this.setState({stackId, id: this.state.id});
  };
  handleConfirm = () => {
    const {drizzle, drizzleState} = this.props;
    const contract = drizzle.contracts.Auction;

    const stackId = contract.methods['approveCurTransaction'].cacheSend({
      from: drizzleState.accounts[0],
      gas: 3000000
    });
    // save the `stackId` for later reference
    this.setState({stackId, id: this.state.id});
  };

  renderBuy = (saleStatus) => {
    const {drizzleState} = this.props;
    // get the contract state from drizzleState
    const {Auction} = drizzleState.contracts;
    // using the saved `dataKey`, get the variable   we're interested in
    const ownerOf = Auction.ownerOf[this.state.dataKey1];
    let option = 'Buy';
    let clickOption = this.handleBuy;
    if (ownerOf && ownerOf.value === drizzleState.accounts[0]) {
      option = 'Confirm';
      clickOption = this.handleConfirm;
    }
    return saleStatus ? (
      <Button
        to="/open-collective"
        position="right-bottom"
        href="#"
        onClick={clickOption}
        className="btn btn-lg btn-primary"
      >
        {option}
      </Button>
    ) : (
      <p>Not for sale</p>
    );
  };
  getTxStatus = () => {
    // get the transaction states from the drizzle state
    const {transactions, transactionStack} = this.props.drizzleState;

    // get the transaction hash using our saved `stackId`
    const txHash = transactionStack[this.state.stackId];

    // if transaction hash does not exist, don't display anything
    if (!txHash) return null;

    // otherwise, return the transaction status
    return `Transaction status: ${transactions[txHash] &&
      transactions[txHash].status}`;
  };
  render() {
    // get the contract state from drizzleState
    const {Auction} = this.props.drizzleState.contracts;
    // using the saved `dataKey`, get the variable   we're interested in
    const getSeabyById = Auction.getSeabyById[this.state.dataKey];
    const getFeaturesById = Auction.getFeaturesById[this.state.dataKey2];

    if (!getSeabyById || !getFeaturesById) {
      return <p>"Loading Seaby..."</p>;
    } else {
      const creature = getSeabyById.value;
      console.log('id:', this.state.id);
      console.log('features:', getFeaturesById.value);
      const imageId = getFeaturesById.value[3]; // body
      return (
        <div className="card text-center border-0 bg-light">
          <div className="front">
            <img className="card-img-top w-auto" src={images[imageId]} alt="" />
          </div>
          <div className="back card-body w-100 position-absolute">
            <h4 className="card-title">{this.state.name}</h4>
            <p className="card-text">{this.state.desc}</p>
          </div>
          <div>
            <SeabyInfor
              name={creature.name}
              birthTime={creature.birthTime}
              generation={creature.generation}
              forSale={creature.forSale}
              price={100 * this.state.id + 1}
            />
            {this.renderBuy(creature.forSale)}
          </div>
          <div>{this.getTxStatus()}</div>
        </div>
      );
    }
  }
}

export default Card;
