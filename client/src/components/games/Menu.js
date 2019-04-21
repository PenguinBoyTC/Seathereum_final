import React from 'react';
import LinkButton from './LinkButton';
import {splitArray, removeWhiteSpace} from '../../util';

import {games} from '.';

const Menu = (props) => {
  const {match, location: loc} = props;
  const splitGames = splitArray(games, 2);
  return (
    <div className="container">
      {splitGames.map((pair, row) => (
        <div className="row" key={row}>
          {pair.map(({name}, col) => (
            <div className="col-6" key={col}>
              <LinkButton
                size={'btn-'.concat(loc.pathname === '/games' ? 'lg' : 'sm')}
                name={name}
                to={`${match.url}/${removeWhiteSpace(name)}`}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
