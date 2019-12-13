import React from 'react';
import ReactDom from 'react-dom';
// import { Provider } from 'react-redux';
// import Store from 'store';
import Router from './routes/Route';


//全局样式
// import 'assets/css/normalize.css';

// ReactDom.render(
//   <Provider store={Store}>
//       <Router/>
//   </Provider>,
//   document.getElementById('app')
// );
ReactDom.render(
  <Router />,
  document.getElementById('app')
);