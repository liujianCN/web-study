import React from 'react';
const defaultProps = {
  title: ''
};

const TicketOrderChangeItem = ( props ) => {
  return (
    <div className="Ticket_Order_Change_Item__Content">
        {
            props.title&&
            <div className="Ticket_Order_Change_Item__title">
                <span>{props.title}</span>
            </div>
        }
        <div className="Ticket_Order_Change_Item__Details">
            {props.children}
        </div>
    </div>
  );
};

TicketOrderChangeItem.defaultProps = defaultProps;
export default TicketOrderChangeItem;