import React, { useState } from 'react';
import PropTypes from 'prop-types';
import indexJS from 'indexJS';

const defaultProps = {
  userName: ''
};
const propsTypes = {
  userName: PropTypes.string
};

const Header = (props) => {
  const { userName } = props;
  /**
   * mq:移动端二维码
   * wx:微信二维码
   */
  const [showQR, setShowQR] = useState('');
  return (
    <div className="Header__Top">
      <div className="Header__Top__Content">
        <div className="Header__Top_UnSign">
          {
            userName ?
              <>
                <a href="javascript:void(0);">{userName}&nbsp;</a>
                {/* <span> | </span> */}
                {/* <a href="javascript:void(0);">&nbsp;退出</a> */}
              </> :
              <>
                <a href="http://www.flycua.com/login/">登录&nbsp;</a>
                <span> | </span>
                <a href="http://www.flycua.com/login/register.html">&nbsp;注册</a>
              </>
          }
        </div>
        <div className="Header__Top_Links">
          <a
            className="Header__Top_QR_MP"
            href="javascript:void(0);"
            onMouseEnter={() => { setShowQR('mq'); }}
            onMouseLeave={() => { setShowQR(''); }}
            style={{ backgroundImage: `url(${indexJS.homeTopPhoneURL})` }}
          >
            移动端
                {
              showQR === 'mq' &&
              <div className="Header__Top_QR_Box">
                <img src={indexJS.qrMobilePhoneURL} />
              </div>
            }
          </a>
          <a
            className="Header__Top_QR_WX"
            href="javascript:void(0);"
            onMouseEnter={() => { setShowQR('wx'); }}
            onMouseLeave={() => { setShowQR(''); }}
            style={{ backgroundImage: `url(${indexJS.homeTopWechatURL})` }}
          >
            微信
                {
              showQR === 'wx' &&
              <div className="Header__Top_QR_Box">
                <img src={indexJS.qrWechatURL} />
              </div>
            }
          </a>
        </div>
        {/*<div
          className="Header__Top_country"
          style={{ backgroundImage: `url(${indexJS.fiveStarRedFlagURL})` }}
        >
          <span>CHINA | 简体中文</span>
        </div>*/}
      </div>
    </div>
  );
};
Header.defaultProps = defaultProps;
Header.propsTypes = propsTypes;
export default Header;