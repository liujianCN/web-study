import React from 'react'
import { connect } from 'react-redux'
class Start extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){
    }
    componentDidMount(){
      console.log(this.props)

    }
    render() {
        let {
            history
        } = this.props;
        const entries = [
          {
            name: '航班查询',
            path: '/Tick_FlightSearch'
          },
          {
            name: '订单详情',
            path: '/Tick_OrderDetail/20J7V1BP6I25'
            // path: '/Tick_OrderDetail/20J7J1Q0MG38'
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
            path: '/Tick_OrderDetailPay'
          }
        ];
        return (
            <div className="Start__Wrapper">
                {
                    entries.map((module,index)=>{
                        return (
                            <div
                              className="module"
                              key={new Date()+index}
                              onClick={()=>{
                                history.push(module.path)
                                }}
                            >
                                {module.name}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Start)