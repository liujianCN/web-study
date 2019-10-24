import React, {Fragment} from 'react';
import Table from 'components/Tableee';
import { getPassengersType, covertIdTypeCodeToCN } from 'utils/TicketOrder';

const defaultProps = {
  passengers: [],
  isOrderChangeSelect:false,
  isOrderChangeConfirm:false
};

const TicketOrderChangePassengers = ({ passengers , isOrderChangeSelect , isOrderChangeConfirm }) => {
  const OrderContactTableTitle = ['旅客姓名', '旅客类型', '凭证类型', '凭证号码', '票号','保险','价格小计'];
  isOrderChangeSelect && OrderContactTableTitle.unshift('');
  isOrderChangeConfirm && OrderContactTableTitle.splice(5,0,'差价','改期费');
  return (
    <Table
      className="orderChange"
      title={OrderContactTableTitle}
    >
      {
        passengers.map(psg => (
          <tr className="Order_Table_Item" key={psg.idNumber}>
            {
              isOrderChangeSelect&&
              <td style={{width:50}}><input type="checkbox"/></td>
            }
            <td>{psg.name}</td>
            <td>{getPassengersType(psg.passType)}</td>
            <td>{covertIdTypeCodeToCN(psg.idTypeCode)}</td>
            <td>{psg.idNumber}</td>
            <td>{psg.details[0].ticketNo}</td>
            <td>{'00'}</td>
            {
              isOrderChangeConfirm&&
              <Fragment>
                <td>{22}</td>
                <td>{33}</td>
              </Fragment>}
            <td>{'3990'}</td>
          </tr>
        ))
      }
    </Table>
  );
};
TicketOrderChangePassengers.defaultProps = defaultProps;
export default React.memo(TicketOrderChangePassengers);