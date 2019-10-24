 import React from 'react';

 const RefundChangeRule = ({passType,rules,style})=>{
   let type='';
   let rule=[];
   switch (passType) {
     case 'ADT':
       type='成人票';
       rule=rules.adtRefundOrChangeTicketFeeList;
       break;
     case 'CHD':
       type='儿童票';
       rule=rules.chdRefundOrChangeTicketFeeList;
       break;
     case 'INF':
       type='婴儿票';
       rule=[
          {description:'航班规定离站时间前7天（含）之前提出',changeFree:'免收手续费',refundFree:'免收手续费'},
          {description:'航班规定离站时间前7天至72小时（含）之内提出',changeFree:'免收手续费',refundFree:'免收手续费'},
          {description:'航班规定离站时间前72小时至4小时（含）之内提出',changeFree:'免收手续费',refundFree:'免收手续费'},
          {description:'航班规定离站时间前4小时之后提出',changeFree:'免收手续费',refundFree:'免收手续费'}
         ];
       break;
     default:
       type='';
       break;
   }
    return (
      <div className="Refund_Change_Rule__Container" style={style}>
        <div className="Refund_Change_Rule__Content fixFloat">
              <div className="Refund_Change_Rule__Item">
                <dt>{type}</dt>
                <dd>变更费</dd>
                <dd>退票费</dd>
              </div>
              {
                rule.map((item,index)=>(
                  <div className="Refund_Change_Rule__Item" key={index}>
                    <dt>{item.description}</dt>
                    <dd>{item.changeFree}</dd>
                    <dd>{item.refundFree}</dd>
                  </div>
                ))
              }
        </div>
      </div>
    );
 };
 export default RefundChangeRule;