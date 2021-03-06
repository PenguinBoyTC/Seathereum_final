import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Drizzle, generateStore} from 'drizzle';
import {DrizzleContext} from 'drizzle-react';

import Auction from './contracts/Auction.json';

const options = {
  contracts: [Auction],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  }
};

const store = generateStore(options);
const drizzle = new Drizzle(options, store);

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <App />
  </DrizzleContext.Provider>,
  document.getElementById('root')
);
