import React, { memo } from 'react';

const OrderTopPosition = ( {position} ) => {
  return (
    <div className="Ticket_Order_Top_Position">
      <span>您的位置： </span>
      <span>{position}</span>
    </div>
  );
};

export default memo(OrderTopPosition);