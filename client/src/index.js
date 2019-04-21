import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import {Drizzle, generateStore} from 'drizzle';
import {DrizzleContext} from 'drizzle-react';
import SeabyBase from "./truffle/build/contracts/SeabyBase.json";

// import MyStringStore from './truffle/build/contracts/MyStringStore.json';

const options = {
  contracts: [SeabyBase],
  web3: {fallback: {type: 'ws', url: 'ws://45.56.124.155:7545'}}
};

const store = generateStore(options);
const drizzle = new Drizzle(options, store);

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <App />
  </DrizzleContext.Provider>,
  document.getElementById('root')
);