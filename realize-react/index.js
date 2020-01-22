import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// 元素
const name = 12345
const ele = (
  <div title="name" style={{ color: 'red', fontSize: '30px'}} className="title">
    hello,
    <span name="hello" onClick={() => console.log(123)}> world</span>
    <p>
      <span name={name}> myName: {name}</span>
    </p>
  </div>
)
const Home = () => (
  <div title={name}></div>
)
class App extends Component {

}
console.log(ele);

console.log(<Home name={name}/>);
// ReactDOM.render('React', document.querySelector('#root'))
// ReactDOM.render(ele, document.querySelector('#root'))
ReactDOM.render(<App name={name} age={18}/>, document.querySelector('#root'))
