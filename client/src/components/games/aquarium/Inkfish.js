import React, {Component} from 'react';
import {DrizzleContext} from 'drizzle-react';
import inkfish from '../../../images/inkfish.png';

class Inkfish extends Component {
  mounted = false;
  constructor(props) {
    super(props);
    const {x = 0, y = 0} = props;
    this.state = {
      frame: null,
      x,
      y
    };
  }
  update = (frame) => {
    if (this.mounted) {
      this.setState(({x, y}) => ({
        frame,
        x: x + frame,
        y
      }));
      requestAnimationFrame(this.update);
    }
  };
  componentDidMount() {
    this.mounted = !this.mounted;
    requestAnimationFrame(this.update);
  }
  componentWillUnmount() {
    this.mounted = !this.mounted;
    cancelAnimationFrame(this.state.frame);
  }
  render() {
    return <img src={inkfish} alt="inkfish" />;
  }
}

export default () => (
  <DrizzleContext.Consumer>
    {(drizzleContext) => {
      const {drizzle, drizzleState, initialized} = drizzleContext;
      if (initialized)
        return <Inkfish drizzle={drizzle} drizzleState={drizzleState} />;
      else return 'Loading...';
    }}
  </DrizzleContext.Consumer>
);
