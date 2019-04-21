import React, {Component} from 'react';
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

export default Inkfish;
