 import React from 'react';

 const RefundChangeRules = ({rules,style})=>{
    return (
      <div className="Refund_Change_Rule__Container" style={style}>
        <div className="Refund_Change_Rule__Content fixFloat">
              <div className="Refund_Change_Rule__Item">
                <dt>成人票</dt>
                <dd>变更费</dd>
                <dd>退票费</dd>
              </div>
              {
                rules.adtRefundOrChangeTicketFeeList.map((item,index)=>(
                  <div className="Refund_Change_Rule__Item" key={index}>
                    <dt>{item.description}</dt>
                    <dd>{item.changeFree}</dd>
                    <dd>{item.refundFree}</dd>
                  </div>
                ))
              }
        </div>
        <div className="Refund_Change_Rule__Content fixFloat">
              <div className="Refund_Change_Rule__Item">
                <dt>儿童票</dt>
                <dd>变更费</dd>
                <dd>退票费</dd>
              </div>
              {
                rules.chdRefundOrChangeTicketFeeList.map((item,index)=>(
                  <div className="Refund_Change_Rule__Item" key={index}>
                    <dt>{item.description}</dt>
                    <dd>{item.changeFree}</dd>
                    <dd>{item.refundFree}</dd>
                  </div>
                ))
              }
        </div>
        <div className="Refund_Change_Rule__Content fixFloat">
              <div className="Refund_Change_Rule__Item">
                <dt>婴儿票</dt>
                <dd>变更费</dd>
                <dd>退票费</dd>
              </div>
              {
                rules.adtRefundOrChangeTicketFeeList.map((item,index)=>(
                  <div className="Refund_Change_Rule__Item" key={index}>
                    <dt>{item.description}</dt>
                    <dd>免收手续费</dd>
                    <dd>免收手续费</dd>
                  </div>
                ))
              }
        </div>
      </div>
    );
 };
 export default RefundChangeRules;