/* eslint-disable */
import React from 'react';
class Cat extends React.Component {
  render() {
    const {x, y} = this.props
    return (
      <div>
        另一个鼠标的位置x:{x},y:{y}
      </div>
    );
  }
}
class MouseTracker extends React.Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0
    };
  }
  handleMouseMove = e => {
    const { clientX, clientY } = e;
    this.setState({
      x: clientX,
      y: clientY
    });
  };
  render() {
    const { x, y } = this.state;
    return (
      <div style={{ height: '90vh' }} onMouseMove={this.handleMouseMove}>
        <div>
          <span>x坐标：{x}</span>
          <span>y坐标：{y}</span>
        </div>
      </div>
    );
  }
}

class Mouse extends React.Component {
    constructor() {
    super();
    this.state = {
      x: 0,
      y: 0
    };
  }
  handleMouseMove = e => {
    const { clientX, clientY } = e;
    this.setState({
      x: clientX,
      y: clientY
    });
  };
  render(){
    return (
      <div style={{ height: '90vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    )
  }
}

class CatTtacker extends React.Component {
  render(){
    return (
      <Mouse render={location => <Cat {...location}/>}/>
    )
  }
}


export default CatTtacker;
