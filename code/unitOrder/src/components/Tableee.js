import React from 'react';

const Table = (props) => {
  return (
    <table
      className="Order_Table_Content"
      style={props.style}
    >
      <thead>
        <tr
          className={`Order_Table_Title ${props.className}`}
          style={props.titleStyle}
        >
          {
            props.title.map(item => (
              item.includes('<br/>') ?
                <th dangerouslySetInnerHTML={{ __html: item }} key={item}></th> :
                <th key={item} >{item}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          props.children
        }
      </tbody>
    </table>
  );
};
export default Table;