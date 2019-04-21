import {loadImage} from '../../../util/loaders';
import inkfish from '../../../images/inkfish.png';
import {randomInt} from '../../../util';

// returns a function that returns a coral object
const createCoralFactory = ({width, height}) => {
  return loadImage(inkfish).then((image) => {
    const {width: w, height: h} = image;
    return () => ({
      pos: {x: width, y: randomInt(0, height - h)},
      get right() {
        return this.pos.x + w;
      },
      get bottom() {
        return this.pos.y + h;
      },
      drawOn(ctx) {
        const {x, y} = this.pos;
        ctx.drawImage(image, x, y);
      },
      // move left
      update() {
        this.pos.x -= 2;
      }
    });
  });
};

export default createCoralFactory;
