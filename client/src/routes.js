import React from 'react';
import {Route} from 'react-router-dom';
import Admin from './components/admin/Admin';
import Video from './components/about/Video';
import Home from './components/home/Home';
// import SetString from './components/data/SetString';
import UserCards from './components/data/UserCards';
import {routes as gameRoutes} from './components/games';
import Market from './components/market/Market';

const routes = [
  {
    component: Home,
    exact: true,
    path: '/'
  },
  {
    component: Video,
    path: '/about'
  },
  {
    component: Market,
    path: '/market'
  },
  gameRoutes,
  {
    component: UserCards,
    path: '/user'
  },
  {
      component: Admin,
      path: '/admin'
  }
];

const denestRoutes = (routes) =>
  routes.reduce((acc, route) => {
    const {routes, ...rest} = route;
    acc.push({...rest});
    return routes
      ? acc.concat(
          denestRoutes(
            routes.map((sub) => {
              const {path: subpath, ...rest} = sub;
              return {...rest, path: `${route.path}${subpath}`};
            })
          )
        )
      : acc;
  }, []);

export default () => {
  return denestRoutes(routes).map(({path, component: C}, i) => (
    <Route key={i} path={path} render={(props) => <C {...props} />} />
  ));
};
