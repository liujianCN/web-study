/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import Card from 'components/Card';
import Table from 'components/Tableee';
import indexJS from 'indexJS';
import { getPassengersType, covertIdTypeCodeToCN } from 'utils/TicketOrder';
import { useDispatch } from 'react-redux';

import useInput from 'components/useInput';

import {
  action_to_save_refund_checked_psg
} from 'actions/ticketOrder';


const defaultProps = {
  refundPsg:[],
  passengers: [],
  hasCheckbox: true//有没有checkbox
};

const RefundPassengers = (props) => {
  const { value, handleInputChange} = useInput({});
  //const refundPsg = useState({});
  const dispatch = useDispatch();
  console.log(value);

  let { passengers, hasCheckbox } = props;
  const OrderContactTableTitle = ['', '旅客姓名', '旅客类型', '凭证类型', '凭证号码', '票号'];
  !hasCheckbox && OrderContactTableTitle.splice(0, 1);
  console.log('render------->');
  return (
    <Card
      icon={indexJS.cardTitleIconPassengerURL}
      title="旅客信息"
    >
      <Table
        title={OrderContactTableTitle}
      >
        {
          passengers.map(psg => (
            <tr className="Order_Table_Item" key={psg.idNumber}>
              {
                hasCheckbox &&
                <td className="Choose_Passenger">
                  <input
                    name={psg.idNumber}
                    onChange={handleInputChange}
                    type="checkbox"
                  />
                </td>
              }
              <td>{psg.name}</td>
              <td>{getPassengersType(psg.passType)}</td>
              <td>{covertIdTypeCodeToCN(psg.idTypeCode)}</td>
              <td>{psg.idNumber}</td>
              <td>{psg.details[0].ticketNo}</td>
            </tr>
          ))
        }
      </Table>
    </Card>
  );
};
RefundPassengers.defaultProps = defaultProps;
export default memo(RefundPassengers);