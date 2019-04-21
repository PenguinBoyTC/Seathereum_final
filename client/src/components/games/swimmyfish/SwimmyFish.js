import React, {Component} from 'react';
import createKeyMapper from '../../../util/keymapper';
import createInkfish from './createInkfish';
import createCoralFactory from './createCoralFactory';

const createEntities = (ctx) =>
  Promise.all(
    [createInkfish, createCoralFactory].map((promise) => promise(ctx))
  );

class SwimmyFish extends Component {
  state = {
    score: 0,
    gameOver: false,
    entities: [],
    frame: null
  };
  constructor(props) {
    super(props);
    this.keymapper = createKeyMapper();
    this.canvas = React.createRef();
  }
  componentDidMount() {
    // listen for key presses on window
    this.keymapper.listenOn(window);

    // grab canvas and ctx references
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    const {width, height} = canvas;
    ctx.fillStyle = 'lightblue';

    createEntities({width, height}).then(([inkfish, createCoral]) => {
      // add inkfish to the front of entities
      this.setState((state) => ({
        entities: [...state.entities, inkfish]
      }));

      // add a keybind for moving the inkfish up
      this.keymapper.addMapping('Space', () => inkfish.swimUp());

      // set up regular intervals for adding coral
      const interval = setInterval(() => {
        // make a new coral
        const c = createCoral();

        // push it onto entities
        this.setState((state) => ({
          score: state.score + 1,
          entities: [...state.entities, c]
        }));
      }, 3000);

      // establish update function for entire game
      const update = (frame) => {
        const {gameOver} = this.state;
        if (!gameOver) {
          ctx.fillRect(0, 0, width, height);
          const {entities, score} = this.state;
          for (const entity of entities) {
            entity.update();
            if (inkfish.collidesWith(entity)) {
              // stop making new obstacles
              clearInterval(interval);

              // show game over text on screen
              ctx.font = '96px Arial';
              ctx.textAlign = 'center';
              ctx.fillStyle = 'black';
              ctx.fillText(`Final Score: ${score}`, width / 2, height / 2);
              this.setState({
                score: 0,
                gameOver: !gameOver,
                entities: []
              });
              break;
            }
            entity.drawOn(ctx);
          }

          this.setState({
            frame,
            // remove all entities that are off the canvas
            entities: entities.filter((entity) => entity.right > 0)
          });
        }
        requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
    });
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.state.frame);
  }
  render() {
    return (
      <div className="my-2 container">
        <div className="row justify-content-center">
          {this.state.gameOver && (
            <button
              className="btn btn-block btn-lg btn-primary mb-2"
              onClick={() => window.location.reload()}
            >
              New Game
            </button>
          )}
        </div>
        <div className="row justify-content-center">
          <canvas width={800} height={600} ref={this.canvas} />
        </div>
      </div>
    );
  }
}

export default SwimmyFish;
