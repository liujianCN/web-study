 import React from 'react';

 const Table = (props)=>{
     return (
        <table className="Order_Table_Content">
            <thead>
                <tr
                  className={`Order_Table_Title ${props.className}`}
                  style={props.titleStyle}
                >
                    {
                        props.title.map(item=>(
                            item.includes('<br/>')?
                            <th dangerouslySetInnerHTML={{__html:item}} key={item}></th>:
                            <th key={item} >{item}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.items&&
                    props.items.map((item,index)=>(

                        <tr
                          className={`Order_Table_Item ${props.className}`}
                          key={item+index}
                          style={props.itemsStyle}
                        >
                            {
                                item.map((item,index)=>(
                                    item.includes('<br/>')?
                                    <td dangerouslySetInnerHTML={{__html:item}} key={item+index}></td>:
                                    <td key={item+index} >{item}</td>
                                ))
                            }
                        </tr>
                    ))
                }

            </tbody>
        </table>
     );
 };
 export default Table;