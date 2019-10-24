import React, { memo } from 'react';
import Card from 'components/Card';
import Table from 'components/Tableee';
import indexJS from 'indexJS';


const defaultProps = {
  contact:{}
};

const TicketOrderContact = ({ contact }) => {
  const OrderContactTableTitle = ['姓名','移动电话','固定电话','邮箱'];
  return (
      <Card
        icon={indexJS.cardTitleIconPassengerURL}
        title="订单联系人信息"
      >
          <Table
            title={OrderContactTableTitle}
          >
            {
              <tr className="Order_Table_Item">
                <td>{contact.name||'-'}</td>
                <td>{contact.telNumber||'-'}</td>
                <td>{contact.landline||'-'}</td>
                <td>{contact.email||'-'}</td>
              </tr>
            }
          </Table>
      </Card>
  );
};
TicketOrderContact.defaultProps = defaultProps;
export default memo(TicketOrderContact);