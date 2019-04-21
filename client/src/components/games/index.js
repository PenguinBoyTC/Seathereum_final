import SwimmyFish from './swimmyfish/SwimmyFish';
import Inkfish from './aquarium/Inkfish';
import Menu from './Menu';
import {removeWhiteSpace} from '../../util';

const games = [
  {
    name: 'aquarium',
    component: Inkfish
  },
  {
    name: 'swimmy fish',
    component: SwimmyFish
  }
];

const routes = {
  component: Menu,
  path: '/games',
  routes: games.map(({name, ...rest}) => ({
    path: `/${removeWhiteSpace(name)}`,
    ...rest
  }))
};

export {games, routes};
