import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import Footer from './Footer';
import Loading from 'components/Loading';

import {
    getLoadingStatus,
    getIsLogin,
    getUserName
} from 'selectors/commonSelector';

import { checkLoginStatus } from 'actions/asyncAction';

const mapState = state => ({
  LoadingStatus: getLoadingStatus(state),
  isLogin: getIsLogin(state),
  userName: getUserName(state)
});
const mapDispatch = {
  checkLoginStatus
};
const NormalPage = (props) => {
  const {
    LoadingStatus,
    isLogin,
    userName,
    checkLoginStatus,
    children
  } = props;
  const location = useLocation();
  //const LoadingStatus = useSelector(getLoadingStatus);
  //let { children } = props;
  // useEffect(()=>{

  // })
  //检查登陆状态
  useEffect(()=>{
  },[checkLoginStatus, isLogin]);
  //
  useEffect(() => {
    !isLogin && checkLoginStatus();
    //console.log('location');
    //console.log(location);
    window.scrollTo(0,0);
  }, [checkLoginStatus, isLogin, location]);

  return (
    <div className="Root__container_wrap">
      <HeaderNav userName={userName}/>
      <div className="MainContent__wrapper">
        {children}
      </div>
      <Footer />
      <Loading show={LoadingStatus} />
    </div>
  );
};

export default connect(mapState, mapDispatch)(NormalPage);