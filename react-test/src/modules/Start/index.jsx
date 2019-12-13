/* eslint-disable no-unused-vars */
import React, { memo, useState, useEffect } from 'react'

const Start = (props) => {
  const { history } = props;
  const [value, setValue] = useState('dfs')
  const entries = [
    {
      name: '测试',
      path: '/Test'
    }
  ];
  function asynnn(){
    return new Promise((r)=>{
      setTimeout(r,3000,'xixixi')
    })

  }
  async function click () {
    if(['3','4'].includes('3')) setValue('hahaha')
    let s = await asynnn()
    setValue('s')

  }

  return (
    <div className="Start__Wrapper" onClick={click}>
      {
        entries.map((module, index) => {
          return (
            <div
              className="module"
              key={new Date() + index}
              onClick={() => {
                history.push(module.path)
              }}
            >
              {module.name} {value}
            </div>
          )
        })
      }
    </div>
  )
}


export default memo(Start)