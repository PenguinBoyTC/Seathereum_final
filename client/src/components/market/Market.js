import React, {Component} from 'react';
import Card from './Card';
import wave from '../../images/wave.png';
import {DrizzleContext} from 'drizzle-react';

class Market extends Component {
  state = {dataKey: null};
  componentDidMount() {
    const {drizzle} = this.props;
    const contract = drizzle.contracts.Auction;
    // let drizzle know we want to watch the `myString` method

    const dataKey = contract.methods['getAllSeabies'].cacheCall();
    // const dataKey = contract.methods["getSeabiesByOwner"].cacheCall(drizzleState.accounts[0]);

    // save the `dataKey` to local component state for later reference
    this.setState({dataKey});
  }
  handleChangeComplete = (color) => {
    this.setState({background: color.hex});
  };

  render() {
    // get the contract state from drizzleState
    const {Auction} = this.props.drizzleState.contracts;
    // using the saved `dataKey`, get the variable   we're interested in
    const getAllSeabies = Auction.getAllSeabies[this.state.dataKey];

    if (!getAllSeabies) {
      return <p>"Loading Seaby..."</p>;
    } else {
      const values = getAllSeabies.value === null ? [] : getAllSeabies.value;
      // console.log("id:", values);
      return (
        <div
          className="container"
          style={{
            color: '#11426a'
          }}
        >
          <div
            className="Header"
            style={{
              backgroundColor: '#1dc5da'
            }}
          >
            <img
              className="wave"
              src={wave}
              style={StyleSheet.img}
              alt="wave"
            />
            <p>Take Sea Creatures back home!</p>
          </div>
          <div className="row">
            {values.map((id) => (
              <div className="card" key={id}>
                <Card
                  id={id}
                  drizzle={this.props.drizzle}
                  drizzleState={this.props.drizzleState}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default () => (
  <DrizzleContext.Consumer>
    {(drizzleContext) => {
      const {drizzle, drizzleState, initialized} = drizzleContext;
      if (initialized)
        return <Market drizzle={drizzle} drizzleState={drizzleState} />;
      else return 'Loading...';
    }}
  </DrizzleContext.Consumer>
);
