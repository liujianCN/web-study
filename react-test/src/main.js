import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { Button } from 'antd';
import App from './App';

import { themes, ThemeContext } from './Context/test';

import store from './redux/store';

class X extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = () => {
      this.setState(state => {
        return {
          theme: state.theme === themes.light ? themes.dark : themes.light
        };
      });
    };
    this.state = {
      theme: themes.dark,
      toggle: this.toggleTheme
    };
  }
  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {/* <div onClick={this.toggleTheme}>
          <Button type="primary">切换主题</Button>
        </div> */}
        <App />
      </ThemeContext.Provider>
    );
  }
}

ReactDom.render(
  <X />,
  // <Provider store={store}>
  // </Provider>,
  document.getElementById('app')
);
