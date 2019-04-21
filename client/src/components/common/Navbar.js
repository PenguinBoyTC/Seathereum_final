import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {DrizzleContext} from 'drizzle-react';
const navs = ['home', 'market', 'games', 'about', 'user'];

class Navbar extends Component {
  state = {key: null};
  componentDidMount() {
    // const {drizzle, drizzleState} = this.props;
    // const contract = drizzle.contracts.MyStringStore;
    // const key = contract.methods['myString'].cacheCall();
    // this.setState({key});
    if (1
      // drizzleState.accounts[0] === '0x35922911ac02BabCCde4e177B5A82C88F1cb0De3'
      // process.env.REACT_APP_OWNER_ADDRESS
    ) {
      navs.push('admin');
    }
  }
  render() {
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
