import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {DrizzleContext} from 'drizzle-react';
const navs = ['home', 'market', 'games', 'about', 'user'];

class Navbar extends Component {
  state = {dataKey: null};
  componentDidMount() {
    const {drizzle} = this.props;
    const contract = drizzle.contracts.Auction;
    const dataKey = contract.methods['owner'].cacheCall();
    this.setState({dataKey});
    // console.log("test",process.env.REACT_APP_OWNER_ADDRESS);
    // console.log("drizzleState.accounts[0]",drizzleState.accounts[0]);
    // if (1
    //   //owner == drizzleState.accounts[0]
    //   // drizzleState.accounts[0] === '0x35922911ac02BabCCde4e177B5A82C88F1cb0De3'
    //   // process.env.REACT_APP_OWNER_ADDRESS == drizzleState.accounts[0]
    // ) {
    //   navs.push('admin');
    // }
  }
  render() {
    const {Auction} = this.props.drizzleState.contracts;
    // using the saved `dataKey`, get the variable   we're interested in
    const owner = Auction.owner[this.state.dataKey];
    if (!owner) {
      return <p>"Loading Seaby..."</p>;
    } else if (
      owner.value === this.props.drizzleState.accounts[0] &&
      navs.length === 5
    ) {
      navs.push('admin');
    }
    return (
      <nav className="navbar navbar-expand-lg navbar-light justify-content-center">
        <img className="navbar-brand" src="/favicon.ico" alt="Seathereum" />
        {navs.map((nav, i) => (
          <NavLink className="nav-item nav-link" key={i} to={`/${nav}`}>
            <h5 className="text-capitalize">{nav}</h5>
          </NavLink>
        ))}
      </nav>
    );
  }
}

export default () => (
  <DrizzleContext.Consumer>
    {(drizzleContext) => {
      const {drizzle, drizzleState, initialized} = drizzleContext;
      if (initialized)
        return <Navbar drizzle={drizzle} drizzleState={drizzleState} />;
      else return 'Loading...';
    }}
  </DrizzleContext.Consumer>
);
