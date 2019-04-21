import React from 'react';
import {BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Routes from './routes';

import {Banner, Navbar} from './components/common';

const App = () => (
  <BrowserRouter>
    <>
      <Banner />
      <Navbar />
      <Switch>
        <Redirect from="/home" to="/" />
        <Routes />
      </Switch>
    </>
  </BrowserRouter>
);

export default App;
