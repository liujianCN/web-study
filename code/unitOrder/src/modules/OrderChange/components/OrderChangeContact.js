import React from 'react';
import Table from 'components/Tableee';


const defaultProps = {
  contact: {}
};

const OrderChangeContact = ({ contact }) => {
  const OrderContactTableTitle = ['姓名', '移动电话', '固定电话', '邮箱'];
  return (
    <Table
      className="orderChange"
      title={OrderContactTableTitle}
    >
      {
        <tr className="Order_Table_Item">
          <td>{contact.name || '-'}</td>
          <td>{contact.telNumber || '-'}</td>
          <td>{contact.landline || '-'}</td>
          <td>{contact.email || '-'}</td>
        </tr>
      }
    </Table>
  );
};
OrderChangeContact.defaultProps = defaultProps;
export default React.memo(OrderChangeContact);