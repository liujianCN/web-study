import React, { memo } from 'react'

const Start = ({history}) => {

  const entries = [
    {
      name: '测试',
      path: '/Test'
    }
  ];

  return (
    <div className="Start__Wrapper">
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
              {module.name}
            </div>
          )
        })
      }
    </div>
  )
}


export default memo(Start)