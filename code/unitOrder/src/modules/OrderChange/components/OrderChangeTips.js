import React from 'react';

const defaultProps = {
  contentText: ''
};


const OrderChangeTips = ({ contentText}) => {
  return (
        <div className="Ticket_Order_Change_Tips__Content">
            {contentText}
        </div>
  );
};
OrderChangeTips.defaultProps = defaultProps;
export default React.memo(OrderChangeTips);