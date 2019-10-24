import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';

const entries = [
  {
    name: '航班查询',
    path: '/Tick_FlightSearch'
  },
  {
    name: '订单详情',
    path: '/orderDetail?orderNo=20JAG1BPA3GH'
  },
  {
    name: '申请退票',
    path: '/Tick_OrderRefund'
  },
  {
    name: '机票改升',
    path: '/Tick_OrderChange'
  },
  {
    name: '确认并支付',
    path: '/Tick_OrderChange_Confirm'
  },
  {
    name: '改升出票',
    path: '/Tick_OrderChange_Success'
  },
  {
    name: '未支付订单支付',
    path: '/orderDetailPay'
  }
];

const style = {
  height: 180,
  lineHeight: '180px',
  width: 180,
  borderRadius: 90,
  backgroundColor: '#ccc',
  textAlign: 'center',
  cursor: 'pointer'
};

const containerStyle = {
  display: 'flex', flexWrap: 'wrap',
  width: 980,
  margin: '100px auto',
  justifyContent: 'center'
};

const Start = () => {
  console.log('xxxxxxx');
  const history = useHistory();
  return (
    <div>
      <div className="Start__Wrapper" style={containerStyle}>
        {
          entries.map((module, index) => {
            return (
              <div
                className="module"
                key={index}
                onClick={() => {
                  history.push(module.path);
                }}
                style={style}
              >
                {module.name}
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default memo(Start);