/*eslint-disable */
import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
//import loadable from '@loadable/component';
import NormalPage from 'components/NormalPage';
import Loading from 'components/Loading';
import Test from 'modules/Test'

import Start from 'modules/Start/index';
const routes = [
  {
    path: '/test',
    component: Test
  }
]

const Root = () => {
  return (
    <Router>
      <Switch>
        <NormalPage>
          <Route exact path="/" render={() => <Redirect to='/start' />} />
          <Route path='/start' component={Start}  header={true}/>
          {
            routes.map(route => {
              return <Route key={route.path} path={route.path} component={route.component} header={false}/>
            })
          }
        </NormalPage>
      </Switch>
    </Router>
  );
}

export default Root;
