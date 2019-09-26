import 'core-js/stable';
import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Store from 'store';
import Router from './routes/router';


//全局样式
import('assets/css/normal.css');
//cuss项目样式
import('./styles/main.scss');

ReactDom.render(
  <Provider store={Store}>
      <Router/>
  </Provider>,
  document.getElementById('app')
);