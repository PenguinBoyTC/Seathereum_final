import inkfish from '../../../images/inkfish.png';
import octopus from '../../../images/octopus.png';
import turtle from '../../../images/turtle.png';
import {loadImage} from '../../../util/loaders';
const images = [inkfish, octopus, turtle];


const createInkfish = ({width, height}) => {
  
  return loadImage(octopus).then((image) => {
    const halfway = height / 2;
    const {width: w, height: h} = image;
    return {
      pos: {x: width / 8, y: halfway - h / 2},
      get right() {
        return this.pos.x + w;
      },
      get bottom() {
        return this.pos.y + h;
      },
      set top(y) {
        this.pos.y = y;
      },
      collidesWith(obstacle) {
        // can not collide with self
        if (obstacle === this) return false;
        else {
          // pull out obstacle's x, y, right, bottom
          const {
            pos: {x, y},
            right,
            bottom
          } = obstacle;
          return (
            this.pos.x < right &&
            this.right > x &&
            this.pos.y < bottom &&
            this.bottom > y
          );
        }
      },
      drawOn(ctx) {
        const {x, y} = this.pos;
        ctx.drawImage(image, x, y);
      },

      update() {
        // apply gravity
        this.pos.y += 2;
        const {bottom} = this;
        // check if touching bottom of canvas
        if (bottom > height) this.top = height - h;
        // check if touching top of canvas
        else if (bottom < h) this.top = 0;
      },
      swimUp() {
        this.pos.y -= 30;
      }
    };
  });
};

export default createInkfish;
