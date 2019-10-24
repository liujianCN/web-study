import React from 'react';
import Table from 'components/Tableee';

const refundConfirmDeatilsTitle = ['票号','旅客名','航班','航段类型','航段支付金额','退还税费','退票手续费','改期手续费','退票金额','原始税费','应退红包金额','应退保险金额'];
const refundConfirmDeatilsContent = [['5678987656787656','旅客名misamaign/dmfi','航班','OPEN FOR USE','5673','374','3872','87325','3895','78345','8934','93485']];

const Confirm = () => {
    console.log('render confirms');
  return (
    <div className="Refund_Application_Confirm_Content">
        <h4>查看手续费</h4>
        <div className="Refund_Application_Confirm_Details">
            <div>
                <Table
                  items={refundConfirmDeatilsContent}
                  itemsStyle={{fontSize:'12px'}}
                  title={refundConfirmDeatilsTitle}
                  titleStyle={{backgroundColor:'#d7dbf8',fontSize:'12px'}}
                >
                  {
                    refundConfirmDeatilsContent.map((item,index) => (
                      <tr key={index}>
                        {
                          item.map((item,index) => {
                            <td key={index}>{item}</td>;
                          })
                        }
                      </tr>
                    ))
                  }
                </Table>
                <h4>温馨提示：退票时改期手续费不予退还</h4>
            </div>
            <div className="Refund_Application_Confirm_Amount">
                <p>应退机票金额 = 未使用段票价总和818元+未使用段应退票税总和50元-未使用段退票手续费 = 623元</p>
                <p>应退保险金额 = 0元</p>
            </div>
        </div>

    </div>

  );
};

export default Confirm;