import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { getRefundPsg } from 'selectors/ticketOrderSelector';
import Card from 'components/Card';
import Button from 'components/Button';
import FormInput from 'components/FormInput';
import Modal from 'components/Modal';
//import Modala from
import Confirm from './RefundConfirm';
import indexJS from 'indexJS';
import useInput from 'components/useInput';

const RefundApplicationForm = () => {
  //const initState = {
  //  refundReason: 'personalReasons',//退票原因
  //  refundReasonDetail: '',//航司原因
  //  passengerNotes: '',//旅客须知
  //  reasonsText: '',//原因内容
  //  showConfirm: false
  //};
  //const [state, setState] = useState(initState)
  const refundPsg = useSelector(getRefundPsg);/**退票乘客 */
  const applicationName = useInput('');/**申请退票联系人信息 */
  const applicationContact = useInput('');
  const refundReason = useInput('personalReasons');
  const reasonsText = useInput('');//退票原因内容
  const refundReasonDetail = useInput('flightChanged');/**航司原因哪一个，延误，推迟，取消 */
  const passengerNotes = useInput(false);//旅客须知

  const handleSubmit = () => {
    if (refundPsg.length == 0) {
      Modal.alert({
        content: '请至少选择一个乘机人',
        width: '300px'
      });
      return false;
    }
    if (!applicationName.value || !applicationContact.value) {
      Modal.alert({
        content: '请输入退票申请人和联系方式'
      });
      return false;
    }
    if (!(/^1[3456789]\d{9}$/.test(applicationContact.value))) {
      Modal.alert({
        content: '请输入正确的联系方式'
      });
      return false;
    }
    if (!reasonsText.value) {
      Modal.alert({
        content: '请输入退票原因，谢谢您的合作'
      });
      return false;
    }
    if (!passengerNotes.value) {
      Modal.alert({
        content: '请您阅读旅客须知'
      });
      return false;
    }
    // showConfirm = !showConfirm;
    Modal.confirm({
      title: '确认退票',
      contentHtml: <Confirm />,
      cancelButtonText: '关闭',
      okButtonText: '确认退票',
      onOk: () => {
        //history.push('/Tick_TicketBaggageSell');
      },
      onCancel: () => {
      }
    });
  };
  const handleCancle = () => {
    console.log(123);
  };

  console.log('render applacation');
  return (
    <div>
      <Card
        icon={indexJS.cardTitleIconPointURL}
        title="退票"
      >
        <div className="Refund_Application_Form__Container">
          <div className="Refund_applicant_Info_Icon" style={{ backgroundImage: 'url(' + indexJS.refundTipRedURL + ')' }}>退票申请人信息</div>
          <div className="Refund_Application_Reason_Icon" style={{ backgroundImage: 'url(' + indexJS.refundTipRedURL + ')' }}>退票原因</div>
          <div className="Refund_Application_Form__Content">
            <div className="Refund_applicant_Info">
              {/* <FormInput
                handleInputChange={handleInputChange}
                label="申请人姓名"
                name="applicationName"
                placeholder="请输入"
                style={{ margin: '0 80px 0 10px', width: '230px', height: '40px' }}
                value={applicationName}
              />
              <FormInput
                handleInputChange={handleInputChange}
                label="申请人联系方式"
                name="applicationContact"
                placeholder="请输入"
                style={{ marginLeft: '10px', width: '230px', height: '40px' }}
                value={applicationContact}
              /> */}
              <FormInput
                {...applicationName}
                label="申请人姓名"
                style={{ margin: '0 80px 0 10px', width: '230px', height: '40px' }}
              />
              <FormInput
                {...applicationContact}
                label="申请人联系方式"
                style={{ marginLeft: '10px', width: '230px', height: '40px' }}
              />
            </div>
            <div className="Refund_Application_Reason">
              <div className="Refund_Application_Reason_Item">
                <FormInput
                  checked={refundReason.value === 'personalReasons'}
                  handleInputChange={refundReason.handleInputChange}
                  label="个人原因"
                  type="radio"
                  value="personalReasons"
                />
                {
                  refundReason.value === 'personalReasons' && (
                    <div>
                      <p className="Refund_Application_Reason_Tips">您提交的自愿退票申请，我司将按照票务规定收取相应的退票手续费后退回余额</p>
                      <FormInput
                        {...reasonsText}
                        type="textarea"
                      />
                    </div>
                  )
                }
              </div>
              <div className="Refund_Application_Reason_Item">
                <FormInput
                  checked={refundReason.value === 'airlineReasons'}
                  handleInputChange={refundReason.handleInputChange}
                  label="航司原因"
                  type="radio"
                  value="airlineReasons"
                />
                {
                  refundReason.value === 'airlineReasons' && (
                    <div className="Refund_Airline_Reason_Content">
                      <FormInput
                        checked={refundReasonDetail.value === 'flightChanged'}
                        handleInputChange={refundReasonDetail.handleInputChange}
                        label="航班变动"
                        type="radio"
                        value="flightChanged"
                      />
                      <FormInput
                        checked={refundReasonDetail.value === 'flightDelayed'}
                        handleInputChange={refundReasonDetail.handleInputChange}
                        label="航班延误"
                        type="radio"
                        value="flightDelayed"
                      />
                      <FormInput
                        checked={refundReasonDetail.value === 'flightCanceled'}
                        handleInputChange={refundReasonDetail.handleInputChange}
                        label="航班取消"
                        type="radio"
                        value="flightCanceled"
                      />
                      <p className="Refund_Application_Reason_Tips">如果您因航司原因提交退票，请您在此处提交退票原因后提交，我司进行审核后执行退票</p>
                      <FormInput
                        {...reasonsText}
                        type="textarea"
                      />
                    </div>
                  )
                }
              </div>
              <div className="Refund_Application_Reason_Item">
                <FormInput
                  checked={refundReason.value === 'otherReasons'}
                  handleInputChange={refundReason.handleInputChange}
                  label="其他原因"
                  type="radio"
                  value="otherReasons"
                />
                {
                  refundReason.value === 'otherReasons' && (
                    <div>
                      <p className="Refund_Application_Reason_Tips">其他原因</p>
                      <FormInput
                        {...reasonsText}
                        type="textarea"
                      />
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </Card>
      <div className="Refund_Application_Passenger_Notes">
        <FormInput
          checked={passengerNotes.value==='true'}
          handleInputChange={passengerNotes.handleInputChange}
          type="radio"
          value
        />
        <span>我已经阅读并理解</span><a href="#">《旅客须知》</a>
      </div>
      <div className="Refund_Application_Btn_Group">
        <Button handleClick={handleCancle} type="gray">返回取消</Button>
        <Button handleClick={handleSubmit} style={{ marginLeft: '10px' }}>提交退票</Button>
      </div>
    </div>
  );
};

export default memo(RefundApplicationForm);