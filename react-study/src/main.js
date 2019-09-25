import 'core-js/stable';
import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
// import { Router } from 'react-router';
import Store from 'store';
import Router from './routes/router';

//import { hot } from 'react-hot-loader/root';
//const Routers = hot(Router)
//console.log('Store.getState()')
//console.log(Store.getState())

//全局样式
require('assets/css/lib/normal.css');
//cuss项目样式
require('./styles/main.scss');

ReactDom.render(
  <Provider store={Store}>
      <Router/>
  </Provider>,
  document.getElementById('app')
);