import React, { Component } from "react";
import UserCard from "./UserCard";
import wave from "../../images/wave.png";
import {DrizzleContext} from 'drizzle-react';

//import { SketchPicker } from 'react-color';
//npm install react-color --save

// TODO
// in the future creatures will get pulled from the network will probably be
// done in market constructor

const text = {
  color: "#11426a"
};

const headerbg = {
  backgroundColor: "#1dc5da"
};

const footer1 = {
  backgroundColor: "#64b5f6"
};

const footer2 = {
  backgroundColor: "#2196f3"
};

const footer3 = {
  backgroundColor: "#1976d2"
};

class UserCards extends Component {
  state = { dataKey: null };
  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Auction;
    // let drizzle know we want to watch the `myString` method
    // const dataKey = contract.methods["getAllSeabies"].cacheCall();

    const dataKey = contract.methods["getSeabiesByOwner"].cacheCall(drizzleState.accounts[0]);

    // save the `dataKey` to local component state for later reference
    this.setState({ dataKey });
  }
  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };

  render() {
    // get the contract state from drizzleState
    const { Auction } = this.props.drizzleState.contracts;
    // using the saved `dataKey`, get the variable   we're interested in
    // const getAllSeabies = Auction.getAllSeabies[this.state.dataKey];
    const getAllSeabies = Auction.getSeabiesByOwner[this.state.dataKey];

    if (!getAllSeabies) {
      return <p>"Loading Seaby..."</p>;
    } else {
      const values = getAllSeabies.value === null ? [] : getAllSeabies.value;
      console.log("id:", values);
      return (
        <div className="container" style={text}>
          <div className="Header" style={headerbg}>
            <img className="wave" src={wave} style={StyleSheet.img} />
            <h4>What you have:</h4>
          </div>
          <div className="row">
            {values.map( id => (
              <div className="card" key={id}>
                <UserCard
                  id={id}
                  drizzle={this.props.drizzle}
                  drizzleState={this.props.drizzleState}
                />
              </div>
            ))}
          </div>

          <div className="footer" style={footer1}>
            <a>© 2019 All rights reserved</a>
          </div>
          <div className="footer" style={footer2}>
            <a>© 2019 All rights reserved</a>
          </div>
          <div className="footer" style={footer3}>
            <a>© 2019 All rights reserved</a>
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
        return <UserCards drizzle={drizzle} drizzleState={drizzleState} />;
      else return 'Loading...';
    }}
  </DrizzleContext.Consumer>
);