/* eslint-disable */
import React, { Component } from 'react';
import { DatePicker, Button } from 'antd';
import { connect } from 'react-redux';

import { ThemeContext } from '../Context/test.js';

function X(props) {
  return (
    <>
      <div style={props.context.theme}>{props.context.theme.color}</div>
      <Button onClick={props.context.toggle}>切换主题</Button>
    </>
  );
}
function Y(props) {
  console.log(props);
  return (
    <ThemeContext.Consumer>
      {context => {
        return <div>{context.theme.color}</div>;
      }}
    </ThemeContext.Consumer>
  );
}
const mapState = state => ({
  title: state.test.headerTitle
});

// @connect(mapState)
class Home extends Component {
  state = {
    name: '刘健',
    age: 18
  };
  static contextType = ThemeContext;
  componentDidMount() {
    // 在生命周期里和事件处理函数里是表现为异步。
    // this.setState({
    //   age: this.state.age + 1
    // }, () => {
    //   console.log('mount1', this.state.age);
    // })
    // this.setState({
    //   age: this.state.age + 1
    // }, function(){
    //   console.log('mount2', this.state.age);
    // })
    // this.setState({
    //   age: 19
    // })
    // this.setState((state, props) => {
    //   console.log(state);
    //   console.log(props);
    //   return {
    //     age: state.age + 1
    //   }
    // })
    // console.log('mount3', this.state.age);
    // document.addEventListener('click', this.handleClick)
  }
  handleClick = () => {
    console.log(this.state);
    this.setState({
      age: 19
    });
    console.log(this.state.age);
  };
  otherClick = () => {
    console.log('nice');
  };

  render() {
    // console.log('render', this.state.age);
    console.log(this.context);
    return (
      <div>
        <Button onClick={this.otherClick}>{this.props.title}</Button>
        <Button onClick={this.handleClick}>{this.state.name}</Button>
        <DatePicker />
        <X context={this.context} />
        <Y />
      </div>
    );
  }
}

export default Home;
