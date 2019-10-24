///* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
//import { HOST } from 'CONF';
const { H5URL, HOST } = { HOST: 'http://www.flycua.com', H5URL: 'https://m.flycua.com/h5' };
const defaultProps = {
};
const propsTypes = {
  userName: PropTypes.string
};
const tabList = [
  { text: '首页', hover: false, openWay: 'jump', link: `${HOST}/index.html` },
  {
    text: '预订行程',
    hover: true,
    left: 0,
    active: false,
    listData: [
      [{ text: '机票销售', openWay: 'jump', link: `${HOST}/booking/` }],
      [{ text: '酒店销售', openWay: 'jump', link: `${HOST}/DiscountedTravel.html` }],
      [{ text: '租车', openWay: 'jump', link: `${HOST}/DiscountedTravel.html` }]
    ],
    link: `${HOST}/booking/`,
    openWay: 'jump'
  },
  {
    text: '出行服务',
    hover: true,
    left: 0,
    active: false,
    listData: [
      [
        { text: '选座', openWay: 'jump', link: `${H5URL}/seat/webCheckSeat.html` },
        { text: '餐食', openWay: 'jump', link: 'http://new.flycua.com/server/meal.html' },
        { text: '行李', openWay: 'jump', link: `${HOST}/baggage/baggage.html` }
      ],
      [
        { text: '航班动态', openWay: 'jump', link: `${H5URL}/dynamic/queryPage.html` },
        { text: '客票验真', openWay: 'jump', link: `${H5URL}/flightDelay/toSearchPage.html` },
        { text: '航班延误/取消证明打印', openWay: 'jump', link: `${H5URL}/flightDelay/toSearchPage.html` },
        { text: '航班延误/取消证明验真', openWay: 'jump', link: `${H5URL}/flightDelay/toSearchPage.html` }
      ],
      [
        { text: '小动物托运', openWay: 'jump', link: `${HOST}/DiscountedTravel.html` },
        { text: '轮椅服务', openWay: 'jump', link: `${HOST}/DiscountedTravel.html` }
      ]
    ],
    link: ''
  },
  {
    text: '旅客须知',
    hover: true,
    left: 0,
    active: false,
    listData: [
      [
        { text: '国内旅客须知', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/gnlkxz/index.html' },
        { text: '国际旅客须知', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/gjlkxz/index.html' },
        { text: '网上购票须知', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/wsgpxz/index.html' },
        { text: '航空服务指南', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/serviceInformation/index.html' },
        { text: '国内运输总条件', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/gnysztj/index.html' },
        { text: '国际运输总条件', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/gjysztj/index.html' }
      ],
      [
        { text: '飞行健康信息', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/fxjkzs/index.html' },
        { text: '南苑机场线路图', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/nyjclxt/index.html' },
        { text: 'ADM政策', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/ADM/index.html' },
        { text: '机上延误紧急预案', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/jsywyjya/index.html' },
        { text: '保险', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/insurance/index.html' }
      ],
      [
        { text: '特殊旅客须知', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/tslkxz/index.html' },
        { text: '危险品提示须知', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/wxptsxz/index.html' },
        { text: '了解网上支付', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/ljwszf/index.html' },
        { text: '如何手机预订', openWay: 'jump', link: 'http://info.flycua.com/jcms/publish/newb2c/rhsjdp/index.html' }
      ]
    ],
    openWay: 'jump',
    link: 'http://info.flycua.com/jcms/publish/newb2c/gnlkxz/index.html'
  },
  { text: '订单中心', hover: false, openWay: 'jump', judgeLogin: true, link: `${HOST}/order/index.html` },
  { text: '会员中心', hover: false, openWay: 'jump', judgeLogin: true, link: 'https://higo.flycua.com/hp/html/memberHomePage.html' }
  // { text: "会员中心", hover: false, openWay: 'jump', judgeLogin: true, link: `${FFP_URL}/hp/` }
];
const HeaderNav = (props) => {
  const { userName } = props;
  const [hoverItem, setHoverItem] = useState([-1, 0]);
  const handleMouseEnter = (e, i, isHover) => {
    if (isHover) {
      const hoverPosation = e.target.getBoundingClientRect().left;
      setHoverItem([i, hoverPosation]);
    }
  };
  const toPage = link => {
    window.location.href = link;
  };
  const [hoverIndex, hoverPosation] = hoverItem;
  return (
    <div className="Header__Wrapper">
      <Header userName={userName} />
      <div className="Header__Nav fixFloat">
        {/* logo位置 */}
        <div className="Header__Nav_Logo">
          <img className="Header__Nav_LogoImg" src={require('image/ticketOrder/cua-logo-xl-icon.png')} />
        </div>
        <div className="Header__Nav_Content">
          {
            tabList.map((item, index) => {
              return (
                <div
                  className="Header__Nav_Item"
                  key={`header-nav${index}`}
                  onMouseEnter={(e) => { handleMouseEnter(e, index, item.hover); }}
                  onMouseLeave={() => { setHoverItem([-1, 0]); }}
                >
                  <a
                    href="javascript:void(0)"
                    onClick={() => { toPage(item.link); }}
                  >
                    {item.text}
                  </a>
                  {
                    item.listData &&
                    <div
                      className="Hover_Item_Container"
                      style={{ display: hoverIndex === index ? 'block' : 'none' }}
                    >
                      <mark className="Hover_Item_Icon"></mark>
                      <div
                        className="Hover_Item_Content"
                        style={{ width: document.body.clientWidth, left: -hoverPosation }}
                      >
                      </div>
                      <div className="Hover_Item_Content_List__Container fixFloat">
                        {
                          item.listData.map((listDataItem, listDataItemIdx) => {
                            return (
                              <ul key={`header-nav-tab-content-list__ul${index}${listDataItemIdx}`}>
                                {
                                  listDataItem.map((liItem, liItemIdx) => {
                                    return (
                                      <li key={`header-nav-tab-content-list__li${index}${listDataItemIdx}${liItemIdx}`}>
                                        <a
                                          href="javascript:void(0)"
                                          onClick={() => { toPage(liItem.link); }}

                                        >{liItem.text}</a>
                                      </li>
                                    );
                                  })
                                }
                              </ul>
                            );
                          })
                        }
                      </div>
                    </div>
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};
HeaderNav.defaultProps = defaultProps;
HeaderNav.propsTypes = propsTypes;
export default HeaderNav;