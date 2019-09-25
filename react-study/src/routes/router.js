/*eslint-disable */
import React,{Suspense, lazy} from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
//import loadable from '@loadable/component';
import NormalPage from 'components/NormalPage';
import Loading from 'components/Loading';

import Start from 'modules/Start/index';
const Tick_OrderDetail = lazy(() => import(/* webpackChunkName: "orderDetail" */'modules/OrderDetail/containers/OrderDetail'));
const Tick_OrderDetailPay = lazy(() => import(/* webpackChunkName: "orderDetail" */'modules/OrderDetail/containers/TicketOrderPay'));
const Tick_OrderRefund = lazy(() => import(/* webpackChunkName: "orderRefund" */'modules/OrderRefund/containers/OrderRefund'));
const Tick_RefundDetail = lazy(() => import(/* webpackChunkName: "orderRefund" */'modules/OrderRefund/containers/RefundDetail'));
const Tick_OrderChange = lazy(() => import(/* webpackChunkName: "orderChange" */'modules/OrderChange/containers/OrderChange'));
const Tick_OrderChange_Confirm = lazy(() => import(/* webpackChunkName: "orderChange" */'modules/OrderChange/containers/OrderChangeConfirm'));
const Tick_OrderChange_Success = lazy(() => import(/* webpackChunkName: "orderChange" */'modules/OrderChange/containers/OrderChangeSuccess'));

const Root = () => {
  return (
    <Router>
      <Suspense fallback={<Loading show={true}/>}>
        <Switch>
          <Route exact path="/" component={Start} />
          <NormalPage>
            <Route exact path="/Tick_OrderDetail/:orderNo" component={Tick_OrderDetail} />
            <Route exact path="/Tick_OrderDetailPay" component={Tick_OrderDetailPay} />
            <Route exact path="/Tick_OrderRefund" component={Tick_OrderRefund} />
            <Route exact path="/Tick_RefundDetail" component={Tick_RefundDetail} />
            <Route exact path="/Tick_OrderChange" component={Tick_OrderChange} />
            <Route exact path="/Tick_OrderChange_Confirm" component={Tick_OrderChange_Confirm} />
            <Route exact path="/Tick_OrderChange_Success" component={Tick_OrderChange_Success} />
          </NormalPage>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Root;
