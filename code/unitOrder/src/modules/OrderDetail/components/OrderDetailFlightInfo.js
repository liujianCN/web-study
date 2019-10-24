import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Card from 'components/Card';
//import Button from 'components/Button';
import Modal from 'components/Modal';
import RefundAndChangeRule from 'components/RefundAndChangeRule';
import indexJS from 'indexJS';

const defaultProps = {
};

const propsTypes = {
};

class TicketOrderFlightInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showRefundRule: {}
    };
    this.toggleRefundRule = this.toggleRefundRule.bind(this);
    this.insurErrorRefund = this.insurErrorRefund.bind(this);
    this.handleErrorRefund = this.handleErrorRefund.bind(this);
    this.reqRefundOrderDetail = this.reqRefundOrderDetail.bind(this);
  }
  toggleRefundRule(index, rules, passType) {
    //console.log(passType);
    //console.log(index);
    if (passType) {
      this.setState({
        showRefundRule: { ...this.state.showRefundRule, [index]: true },
        rules,
        passType
      });
    } else {
      this.setState({
        showRefundRule: { ...this.state.showRefundRule, [index]: false }
      });
    }
  }
  //保险差错
  insurErrorRefund(flightNo, idNumber, code) {
    let transactionNo = this.props.payInfos[0].transactionNo;
    let refundData = {
      orderNo: this.props.orderNo,
      transactionNo: transactionNo,
      insureSerialNumber: code,
      idNo: idNumber,
      fltNo: flightNo
    };
    //console.log(this.props.reqInsurRefund);
    this.props.reqInsurRefund(refundData);
  }
  //机票差错退款
  handleErrorRefund(errorRefundRes, transactionNo, businessCode) {
    if (errorRefundRes) {
      let orderData = { orderNo: this.props.orderNo };
      this.props.checkErrorRefundResult(orderData, this.reqRefundOrderDetail);
    } else {
      let errorType = '';
      if (this.props.statusTypeOrder === 'TICKED') {
        errorType = 'REPEATED_PAYMENT';
      } else {
        errorType = 'ERROR_REFUND';
      }
      let orderData = {
        orderNo: this.props.orderNo,
        transactionNo: transactionNo,
        businessCode: businessCode,
        errorType: errorType
      };
      Modal.confirm({
        contentTitle: '提示',
        contentText: '您确认要提交申请退款吗？',
        //确认
        onOk: () => {
          this.props.reqRefundOrder(orderData, this.initPage);
        }
      });
    }
  }
  //机票差错退款详情
  reqRefundOrderDetail(resRefundInfo) {
    Modal.alert({
      contentTitle: '差错退款结果',
      contentText: `
        订 单 号 : ${this.props.orderNo} <br/>
        支付网关：${resRefundInfo.paymentGatewayType} <br/>
        支付时间：${resRefundInfo.payTime} <br/>
        支付金额：${resRefundInfo.amount} <br/>
        处理状态：${resRefundInfo.errRefundStatus}
      `
    });
    this.setState({
      resRefundInfo
    });
  }

  /*
    //得到保险信息
    getInsuranceInfo(i, j, index, insuranceData) {
      if (insuranceData.length != 0 && insuranceData[i][j].passengers[index].details) {
        let flightNo = insuranceData[i][j].flightNo;
        let idNumber = insuranceData[i][j].passengers[index].idNumber;
        return (
          <div className="FlightInfo_AddService__Insurance">
            <h5>保险</h5>
            {
              insuranceData[i][j].passengers[index].details.map((item, index) => (
                <div key={index}>
                  <span>{item.name}</span>
                  <span>{`￥${item.amount}`}</span>
                  <span>{item.status}</span>
                  <span>保单号：{item.ticketNo != 'ERROR' ? item.ticketNo : '-'}</span>
                  {
                    item.status == '已报案' && item.ancillaryCode === 'ZHANRRFT2' &&
                    <Button type="small">理赔</Button>
                  }
                  {
                    item.status == '报案失败' && (['ZHANRRFT2', 'AUISAVRI'].includes(item.ancillaryCode)) &&
                    <Button
                      handleClick={this.handleReport}
                      type="small"
                    >报案</Button>
                  }
                  {
                    item.status == '购保失败' &&
                    <Button
                      handleClick={() => { this.props.insurErrorRefund(flightNo, idNumber, item.ancillaryCode) }}
                      type="small"
                    >差错退款</Button>
                  }
                  {
                    item.status == '已申请差错退款' &&
                    <Button type="small">申请成功</Button>
                  }
                </div>
              ))
            }
          </div>
        )
      }
    }

    //得到行李信息
    getBaggageInfo(i, j, index, baggageData) {//i:去程/回程；j:第一段/第二段，index：第几名乘客
      return baggageData.length != 0 && baggageData[i][j].passengers[index].details && baggageData[i][j].passengers[index].details[0].name.slice(4) || '0KG'
      //return '0kg'
    }
  */
  //得到餐食信息
  // getMealInfo = (i, j, index, mealData) => {
  //   if (mealData.length != 0 && mealData[i][j].passengers[index].details) {
  //     return (
  //       <div className="FlightInfo_AddService__Meal_Item">
  //         {
  //           mealData[i][j].passengers[index].details.map((item, index) => (
  //             <p key={index}>{`${item.name}x${item.quantity}`}</p>
  //           ))
  //         }
  //       </div>
  //     );
  //   }
  //   return '未选择餐食';
  // }

  //处理证件号
  getIdNumber(num, code) {
    if (code === 'NI') {
      if (num.length === 18) { return num.replace(/^(.{8})(?:\d+)(.{2})$/, '$1********$2'); }
    } else {
      let startNum = num.slice(0, -4);
      let endNum = '****';
      num = startNum + endNum;
    }
    return num;
  }

  //得到乘机人类型
  getPassengersType(type) {
    if (type === 'ADT') return '成人';
    if (type === 'CHD') return '儿童';
    if (type === 'INF') return '婴儿';
  }

  //得到税费
  getTaxFee(airData, price) {
    let taxFee = 0;
    airData.forEach(item => {
      taxFee += (price - 0) * item.length;
    });
    return taxFee;
  }
  getTaxFeert(taxFeeTotals, passType, airData) {
    let taxFee = 0;
    let amount = 0;
    taxFeeTotals[passType].taxFee.map((item) => {
      amount += item.price - 0;
    });
    airData.forEach(item => {
      taxFee += amount * item.length;
    });
    return <span>往返税费：￥{taxFee}</span>;
  }
  //得到每位乘客的总票价
  getAmount(airData, index) {
    let amount = 0;
    airData.forEach(item => {
      item.forEach(psg => {
        amount += psg.passengers[index].details[0].amount - 0;
      });
    });
    return amount;
  }

  render() {
    let { passengers, airData, baggageData, mealData, insuranceData, taxFeeTotals } = this.props.components;
    const { goPassenOrder } = this.props;
    //console.log(this.props);
    //console.log(taxFeeTotals);
    //console.log(airData);
    return (
      <div>
        <Card
          icon={indexJS.cardTitleIconFlightURL}
          title="机票行程信息"
        >
          {
            passengers &&//乘机人
            passengers.map((psg, index) => {
              psg.showRefundRule = false;
              return (
                <div key={index}>
                  <div className="Order_Detail_PassageInfo">
                    <span>{psg.name}</span>
                    <span>{this.getPassengersType(psg.passType)}</span>
                    <span>{`${psg.idTypeCode} ：${psg.idNumber}`}</span>
                    {psg.details[0].ticketNo && <span>{'票号：' + psg.details[0].ticketNo}</span>}
                    <span>{airData.length > 1 ? '往返价格' : '去程价格'}：￥{this.getAmount(airData, index)}</span>
                    {
                      airData.length > 1 ?
                        this.getTaxFeert(taxFeeTotals, psg.passType, airData)
                        :
                        taxFeeTotals &&
                        taxFeeTotals[psg.passType].taxFee.map((item, index) => (
                          <span key={index}>{item.description} : ￥{this.getTaxFee(airData, item.price)}</span>
                        ))
                    }
                  </div>
                  {
                    //去，返程
                    airData.map((data, i) => (
                      <div className="Order_Detail_FlightInfo fixFloat" key={i}>
                        {
                          //第一段，第二段
                          data.map((item, j) => (
                            <div className="fixFloat" key={j}>
                              <div
                                className="Order_Detail_FlightInfo_Icon"
                                style={{ backgroundImage: `url(${i === 0 ? indexJS.tripInfoGoURL : indexJS.tripInfoRtURL})` }}
                              ></div>

                              <div className="Order_Detail_FlightInfo_SelectBox">
                                {/* <input type="checkbox" /> */}
                              </div>
                              <div className="Order_Detail_FlightInfo_details">
                                <div className="fixFloat">
                                  <div className="FlightInfo_DepartInfo">
                                    <p className="FlightInfo__Top">{`${item.orgAirPort.name}机场 （${item.orgAirPort.code}） `}</p>
                                    <p className="FlightInfo__Bottom">{`${item.depDate} ${item.depTime}`}</p>
                                  </div>
                                  <div
                                    className="FlightInfo_Middle_Icon"
                                    style={{ backgroundImage: 'url(' + indexJS.bookingFlightURL + ')' }}
                                  ></div>
                                  <div className="FlightInfo_ArriveInfo">
                                    <p className="FlightInfo__Top">{`${item.dstAirPort.name}机场 （${item.dstAirPort.code}） `}</p>
                                    <p className="FlightInfo__Bottom">{`${item.arrDate} ${item.arrTime}`}</p>
                                  </div>
                                  <div className="FlightInfo_FlightNum">
                                    <p className="FlightInfo__Top">{item.flightNo}</p>
                                    <p className="FlightInfo__Bottom">{'机型' + item.aircraftType}</p>
                                  </div>
                                  <div className="FlightInfo_Cabin">
                                    <p className="FlightInfo__Top">舱位</p>
                                    <p className="FlightInfo__Bottom">{`${item.bookClass}舱`}</p>
                                  </div>
                                </div>
                                <div className="FlightInfo_AddService fixFloat">
                                  <div className="FlightInfo_AddService__Brand">{`中国联合航空 ${item.brandInfo.brandName}`}</div>
                                  <div className="FlightInfo_AddService__SeatNum">选座：--</div>

                                  {/* 行李 */}
                                  <div className="FlightInfo_AddService__Baggage">行李：{
                                    baggageData.length != 0 && baggageData[i][j].passengers[index].details && baggageData[i][j].passengers[index].details[0].name.slice(4) || '0KG'
                                    //this.getBaggageInfo(i, j, index, baggageData)
                                  }</div>
                                  {/* <div className="FlightInfo_AddService__StopOver">直飞</div> */}

                                  {/* 餐食 */}
                                  <div className="FlightInfo_AddService__Meal">餐食：{

                                    mealData.length != 0 && mealData[i][j].passengers[index].details ? (
                                      <div className="FlightInfo_AddService__Meal_Item">
                                        {
                                          mealData[i][j].passengers[index].details.map((item, index) => (
                                            <p key={index}>{`${item.name} x ${item.quantity}`}</p>
                                          ))
                                        }
                                      </div>
                                    )
                                      : '未选择餐食'

                                    //this.getMealInfo(i, j, index, mealData)
                                  }</div>
                                  {/* 餐食结束 */}
                                </div>
                                <div className="FlightInfo_Refund_Content">
                                  <span className="FlightInfo_Refund_Rules">退改签 ：
                                    <a href="javascript:void(0);"
                                      onMouseEnter={() => { this.toggleRefundRule((`${index}${i}${j}`), item.brandInfo.refundOrChangeTicketRule, psg.passType); }}
                                      onMouseLeave={() => { this.toggleRefundRule(`${index}${i}${j}`); }}
                                    >查看</a>
                                  </span>
                                  {/* <span className="FlightInfo_Status">航段状态 ：正常状态</span> */}
                                  {
                                    (psg.details[0].status) &&
                                    <span className="FlightInfo_Status"
                                      onClick={() => goPassenOrder(psg.details[0])}
                                      style={psg.details[0].afterChangeOrderNo ? { cursor: 'pointer' } : {}}
                                    >
                                      航段状态：{psg.details[0].status}
                                    </span>
                                  }
                                  {/*
                                  暂时不上
                                    (psg.details[0].statusTypeCode) === 'REFUND' && (
                                      <span
                                        className="Refund_Detail_Status"
                                      >退票追踪 ：
                                        <a
                                          href="#/Tick_RefundDetail"
                                        >查看</a>
                                      </span>

                                    )
                                  */}
                                  {
                                    this.state.showRefundRule[`${index}${i}${j}`] &&
                                    <RefundAndChangeRule
                                      passType={this.state.passType}
                                      rules={this.state.rules}
                                      style={{ top: 70, left: -300 }}
                                    />
                                  }
                                </div>
                                {/* 保险信息 */}
                                {
                                  insuranceData.length != 0 && insuranceData[i][j].passengers[index].details && (
                                    <div className="FlightInfo_AddService__Insurance">
                                      <h5>保险</h5>
                                      {
                                        insuranceData[i][j].passengers[index].details.map((item, index) => (
                                          <div key={index}>
                                            <span>{item.name}</span>
                                            <span>{`￥${item.amount}`}</span>
                                            <span>{item.status}</span>
                                            <span>保单号：{item.ticketNo != 'ERROR' ? item.ticketNo : '-'}</span>
                                            {/* {
                                              item.status == '已报案' && item.ancillaryCode === 'ZHANRRFT2' &&
                                              <Button type="small">理赔</Button>
                                            }
                                            {
                                              item.status == '报案失败' && (['ZHANRRFT2', 'AUISAVRI'].includes(item.ancillaryCode)) &&
                                              <Button
                                                handleClick={this.handleReport}
                                                type="small"
                                              >报案</Button>
                                            }
                                            {
                                              item.status == '购保失败' &&
                                              //let flightNo = insuranceData[i][j].flightNo;
                                              //let idNumber = insuranceData[i][j].passengers[index].idNumber;
                                              <Button
                                                handleClick={() => {
                                                  this.insurErrorRefund(insuranceData[i][j].flightNo, insuranceData[i][j].passengers[index].idNumber, item.ancillaryCode);
                                                }
                                                }
                                                type="small"
                                              >差错退款</Button>
                                            }
                                            {
                                              item.status == '已申请差错退款' &&
                                              <Button type="small">申请成功</Button>
                                            } */}
                                          </div>
                                        ))
                                      }
                                    </div>
                                  )
                                  //this.getInsuranceInfo(i, j, index, insuranceData)
                                }
                                {/*保险信息结束*/}
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    ))
                  }
                </div>
              );
            })
          }
        </Card>
      </div>
    );
  }
}
TicketOrderFlightInfo.defaultProps = defaultProps;
TicketOrderFlightInfo.propsTypes = propsTypes;
export default TicketOrderFlightInfo;