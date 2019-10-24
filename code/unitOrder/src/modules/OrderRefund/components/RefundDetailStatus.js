
import React, { memo } from 'react';
import Card from 'components/Card';
import Table from 'components/Tableee';
import Button from 'components/Button';
import indexJS from 'indexJS';

const refundDetailStatus = (props) => {
  console.log(props);
  console.log('render  status');
  return (
    <div>
      <Card
        icon={indexJS.cardTitleIconPointURL}
        title={'审核状态 ：等待一审'}
      >
        <div className="Refund_Detail_Status__Container">
          <div className="Refund_Detail_First_instance" style={{ backgroundImage: 'url(' + indexJS.refundTipRedURL + ')' }}>一审状态</div>
          <div className="Refund_Detail_Second_instance" style={{ backgroundImage: 'url(' + indexJS.refundTipPinkURL + ')' }}>二审状态</div>
          <div className="Refund_Detail_Result" style={{ backgroundImage: 'url(' + indexJS.refundTipGrayURL + ')' }}>处理状态</div>
          <div className="Refund_Detail_Status__Content">
            <div>
              <div>
                <h3>一审结果</h3>
                <Table
                  className="refundDetail"
                  style={{border:'1px solid #e5e5e5',marginBottom:'30px'}}
                  title={['一审人','一审时间','一审状态']}
                >
                  <tr className="Order_Table_Item">
                    <td>ading</td>
                    <td>2019-09-09 12:23:09</td>
                    <td>一审通过</td>
                  </tr>
                </Table>
              </div>

              <div>
                <h3>二审结果</h3>
                <Table
                  className="refundDetail"
                  style={{border:'1px solid #e5e5e5',marginBottom:'30px'}}
                  title={['二审人','二审时间','二审状态']}
                >
                  <tr className="Order_Table_Item">
                    <td>ading</td>
                    <td>2019-09-09 12:23:09</td>
                    <td>一审通过</td>
                  </tr>
                </Table>
              </div>

              <div>
                <h3>处理结果</h3>
                <Table
                  className="refundDetail"
                  style={{border:'1px solid #e5e5e5',marginBottom:'30px'}}
                  title={['处理结果','退款时间','退款金额']}
                >
                  <tr className="Order_Table_Item">
                    <td>等待退款</td>
                    <td>2019-09-09 12:23:09</td>
                    <td>￥7777</td>
                  </tr>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="Refund_Application_Btn_Group">
        <Button>返回我的订单</Button>
      </div>
    </div>
  );
};

export default memo(refundDetailStatus);