import React from 'react';
import indexJS from 'indexJS';

const defaultProps = {
  changeStep: 'flightSelect',
  flightSelectFinished:false,//航班选择完成后，图标颜色改变
  confirmAndPayFinished:false//支付完成后，图标颜色改变
};
const OrderChangeStep = ( {changeStep,flightSelectFinished,confirmAndPayFinished} ) => {
  return (
    <div className="Order_Change_Step__Content">
        <div className="Order_Change_Step__Item">
          <div
            className={`Order_Change_Step__Item_Text ${changeStep==='flightSelect'?'current':''} ${flightSelectFinished?'finished':''}`}
            style={changeStep==='flightSelect'?{backgroundImage: 'url(' + indexJS.stepBgCurrentURL + ')'}:{}}
          >航班选择</div>
          <div
            className="Order_Change_Step__Item_Icon_Left"
            style={{backgroundImage: 'url(' + indexJS.stepBgLeftURL + ')' }}
          ></div>
          <div
            className="Order_Change_Step__Item_Icon_Middle"
            style={{backgroundImage: 'url(' + indexJS.stepBgMiddleURL + ')' }}
          ></div>
        </div>

        <div className="Order_Change_Step__Item">
          <div
            className="Order_Change_Step__Item_Icon_Right"
            style={{backgroundImage: `url(${flightSelectFinished?indexJS.stepBgRightURL:indexJS.stepBgRightGrayURL})`}}
          ></div>
          <div
            className={`Order_Change_Step__Item_Text ${changeStep==='confirmAndPay'?'current':''} ${confirmAndPayFinished?'finished':''}`}
            style={changeStep==='confirmAndPay'?{backgroundImage: 'url(' + indexJS.stepBgCurrentURL + ')'}:{}}
          >确认并支付</div>
          <div
            className="Order_Change_Step__Item_Icon_Left"
            style={{backgroundImage: `url(${flightSelectFinished?indexJS.stepBgLeftURL:indexJS.stepBgLeftGrayURL})`}}
          ></div>
          <div
            className="Order_Change_Step__Item_Icon_Middle"
            style={{backgroundImage: `url(${flightSelectFinished?indexJS.stepBgMiddleURL:indexJS.stepBgMiddleGrayURL})`}}
          ></div>
        </div>

        <div className="Order_Change_Step__Item">
          <div
            className="Order_Change_Step__Item_Icon_Right"
            style={{backgroundImage: `url(${confirmAndPayFinished?indexJS.stepBgRightURL:indexJS.stepBgRightGrayURL})`}}
          ></div>
          <div
            className={`Order_Change_Step__Item_Text 
          ${changeStep==='changedSuccess'?'current':''}`}
            style={changeStep==='changedSuccess'?{backgroundImage: 'url(' + indexJS.stepBgCurrentURL + ')'}:{}}
          >改升出票</div>
        </div>
    </div>
  );
};

OrderChangeStep.defaultProps = defaultProps;
export default React.memo(OrderChangeStep);