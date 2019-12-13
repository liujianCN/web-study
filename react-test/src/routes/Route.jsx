import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import NormalPage from 'components/NormalPage';
// import routes from './routes';
import Start from 'modules/Start/index';


const Root = () => {
  return (
    <Router>
      <Switch>
        <NormalPage>
          <Route component={Start} path="/"/>
          {/* {
            routes.map(route => {
            return <Route key={route.path} path={route.path} >{ route.component }</Route>
            })
          } */}
        </NormalPage>
      </Switch>
    </Router>
  );
}

export default Root;
