/* eslint-disable */
import React, { Component } from 'react';
// 操作props，增加，过滤等
const Li = props => <li>{props.liName}</li>;
const List = props => {
  console.log(props);
  return (
    <ul>
      {props.list.map(item => (
        <Li key={item.name} liName={item.name} />
      ))}
    </ul>
  );
};
const HOCFC = WrapComponent => {
  const antherProp = { type: 'HOC' };
  return props => {
    return <WrapComponent {...props} {...antherProp} />;
  };
};

const HOCCC = WrapComponent => {
  const antherProp = { type: 'HOC' };
  return class New extends Component {
    render() {
      return <WrapComponent {...this.props} {...antherProp} />;
    }
  };
};

//抽象state

const HOCWithInput = WrapComponent => {
  class HOCWithInput extends Component {
    state = {
      name: ''
    };
    onChange = e => {
      const value = e.target.value.replace('$', '');
      this.setState({
        name: value ? '$' + value : ''
      });
    };
    render() {
      console.log(this.state);
      console.log(this.props);
      const name = {
        value: this.state.name,
        onChange: this.onChange
      };
      const { inputRef, ...rest } = this.props;

      return <WrapComponent ref={inputRef} {...rest} name={name} />;
    }
  }
  return React.forwardRef((props, ref) => {
    return <HOCWithInput inputRef={ref} {...props} />;
  });
};

@HOCWithInput
class Input extends React.PureComponent {
  componentDidMount(){
    console.log(this.inputElement);
  }
  focus = () => {
    this.inputElement.focus()
  }
  render() {
    console.log(this.props);
    return <input ref={(input) => {this.inputElement = input}} {...this.props.name} />;
  }
}

// export default HOCFC(List);
export default Input;
