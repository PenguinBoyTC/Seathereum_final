import React, {Component} from 'react';

import Generator from './Generator';

import {DrizzleContext} from 'drizzle-react';

class Admin extends Component {
  state = {key: null};
  componentDidMount() {
    // const {drizzle} = this.props;
  }
  render() {
    return <div><Generator /></div>;
  }
}

export default () => (
  <DrizzleContext.Consumer>
    {(drizzleContext) => {
      const {drizzle, drizzleState, initialized} = drizzleContext;
      if (initialized)
        return <Admin drizzle={drizzle} drizzleState={drizzleState} />;
      else return 'Loading...';
    }}
  </DrizzleContext.Consumer>
);
