import React, { memo } from 'react';

const footerList = [
  {
    title: '大客户',
    list: [
      {
        text: 'B2B网站',
        link: 'https://b2b.flycua.com/'
      },
      {
        text: '政府采购',
        link: 'https://www.gpticket.org/login.action;jsessionid=2209527952890EDCC7F38AF8F5430FC7'
      }
    ]
  },
  {
    title: '关于联航',
    list: [
      {
        text: '关于联航',
        link: 'http://info.flycua.com/jcms/publish/newb2c/aboutus_newb2c/'
      },
      {
        text: '就业机会',
        link: 'http://info.flycua.com/jcms/publish/newb2c/careerlist/'
      },
      {
        text: '航线分布',
        link: 'http://info.flycua.com/jcms/publish/newb2c/airlineroute/'
      },
      {
        text: '机组成员风采',
        link: 'http://info.flycua.com/jcms/publish/newb2c/cabincrew/'
      }
    ]
  },
  {
    title: '新闻公告',
    list: [
      {
        text: '联航新闻',
        link: 'http://info.flycua.com/jcms/publish/newb2c/newslist/'
      },
      {
        text: '通知公告',
        link: ''
      },
      {
        text: '促销信息',
        link: ''
      }
    ]
  },
  {
    title: '客服',
    list: [
      {
        text: '客户服务热线',
        link: 'http://info.flycua.com:81/jcms/publish/newb2c/servicenumber/'
      },
      {
        text: '意见与反馈',
        link: 'https://m.flycua.com/h5/complain/feedback.html?from=B2C'
      },
      {
        text: '微信公众号',
        link: 'http://info.flycua.com/jcms/publish/newb2c/wechat/'
      }
    ]
  }
];
const Footer = () => {
  const jump = link => {
    if (link) {
      window.location.href = link;
    }
  };
  const getWidth = () => {
    return 1000 / footerList.length;
  };
  return (
    <div className="Footer__Wrapper">
      <div className="Footer__Top">
        {
          footerList.map((item) => (
            <dl
              key={item.title}
              style={{ width: getWidth() }}
            >
              <dt>{item.title}</dt>
              {
                item.list.map(item => (
                  <dd
                    key={item.text}
                  >
                    <a
                      href="javascript:void(0)"
                      onClick={() => jump(item.link)}
                    >{item.text}</a>
                  </dd>
                ))
              }
            </dl>
          ))
        }
      </div>
      <div className="Footer__Bottom">
        <div className="Footer__Bottom_Content">
          <div className="Footer__Bottom_Img">
            <a
              href="https://v.yunaq.com/certificate?domain=www.flycua.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img alt="" src="http://www.flycua.com/resource/images/public/Catch953D(10-10-15-58-29).jpg?v=zh_CN_18088" />
            </a>
            <span> </span>
            <a
              href="http://si.trustutn.org/info?sn=921160510021858320242&amp;certType=1"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img alt="" src="http://www.flycua.com/resource/images/public/brand.jpg?v=zh_CN_18088" />
            </a>
          </div>
          <div className="Footer__Bottom_Link">
            <a className="fot-link first" href="/aboutUA/index.html">关于联航</a>
            <a className="fot-link" href="http://info.flycua.com/jcms/publish/newb2c/careerlist/">招聘信息</a>
            <a className="fot-link" href="javascript:void(0);">招标信息</a>
            <a className="fot-link" href="http://info.flycua.com/jcms/publish/newb2c/policy">法律和隐私条款</a>
            <a className="fot-link" href="http://info.flycua.com/jcms/publish/newb2c/link">友情链接</a>
            <p>© Copyright 2010 中国联合航空有限公司
                <a href="http://www.miibeian.gov.cn/">京ICP备05075559号</a>
              <a href="https://credit.cecdc.com/CX20160114013306880390.html" rel="noopener noreferrer"
                target="_blank"
              >
                <i className="Footer_Bottom_Credit_Icon"></i>
              </a>
            </p>
          </div>
          <div className="Footer__Bottom_Tel">
            <div>
              <span >客服电话</span>
              <a href="http://www.flycua.com/serviceCenter/serviceHotline.html">400-102-6666</a>
            </div>
            <div>
              <span >价格举报电话</span>
              <a href="http://www.flycua.com/serviceCenter/serviceHotline.html">12358</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);