/*eslint-disable */
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NormalPage from 'components/NormalPage';
//import loadable from '@loadable/component';
// import Loading from 'components/Loading';

//import history from '@/history'

//import Start from 'modules/Start/index';

import Tick_OrderDetail from 'modules/OrderDetail/containers/OrderDetail';
//import Tick_OrderDetailPay from 'modules/OrderDetail/containers/TicketOrderPay';
//import Tick_OrderRefund from 'modules/OrderRefund/containers/OrderRefund';
//import Tick_RefundDetail from 'modules/OrderRefund/containers/RefundDetail';
//import Tick_OrderChange from 'modules/OrderChange/containers/OrderChange';
//import Tick_OrderChange_Confirm from 'modules/OrderChange/containers/OrderChangeConfirm';
//import Tick_OrderChange_Success from 'modules/OrderChange/containers/OrderChangeSuccess';
//const Tick_OrderDetail = lazy(() => import(/* webpackChunkName: "orderDetail" */'modules/OrderDetail/containers/OrderDetail'));
//const Tick_OrderDetailPay = lazy(() => import(/* webpackChunkName: "orderDetail" */'modules/OrderDetail/containers/TicketOrderPay'));
//const Tick_OrderRefund = lazy(() => import(/* webpackChunkName: "orderRefund" */'modules/OrderRefund/containers/OrderRefund'));
//const Tick_RefundDetail = lazy(() => import(/* webpackChunkName: "orderRefund" */'modules/OrderRefund/containers/RefundDetail'));
//const Tick_OrderChange = lazy(() => import(/* webpackChunkName: "orderChange" */'modules/OrderChange/containers/OrderChange'));
//const Tick_OrderChange_Confirm = lazy(() => import(/* webpackChunkName: "orderChange" */'modules/OrderChange/containers/OrderChangeConfirm'));
//const Tick_OrderChange_Success = lazy(() => import(/* webpackChunkName: "orderChange" */'modules/OrderChange/containers/OrderChangeSuccess'));

const Root = () => {
  return (
    <Router>
      {/* <Suspense fallback={<Loading show={true}/>}> */}
      <Switch>
        <NormalPage>
          {/* <Route exact path="/">
            <Redirect  to="/orderDetail"/>
          </Route>
          <Route exact path="/start">
            <Start />
          </Route> */}
          <Route exact path="/orderDetail" >
            <Tick_OrderDetail/>
          </Route>
          {/* <Route exact path="/orderDetailPay">
            <Tick_OrderDetailPay />
          </Route>
          <Route exact path="/Tick_OrderRefund">
            <Tick_OrderRefund />
          </Route>
          <Route exact path="/Tick_RefundDetail">
            <Tick_RefundDetail />
          </Route>
          <Route exact path="/Tick_OrderChange">
            <Tick_OrderChange />
          </Route>
          <Route exact path="/Tick_OrderChange_Confirm">
            <Tick_OrderChange_Confirm />
          </Route>
          <Route exact path="/Tick_OrderChange_Success">
            <Tick_OrderChange_Success />
          </Route> */}
        </NormalPage>
      </Switch>
      {/* </Suspense> */}
    </Router>
  );
}

export default Root;
