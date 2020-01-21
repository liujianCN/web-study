import React from 'react';
import Home from './page/Hooks';

class App extends React.PureComponent {
  constructor(props){
    super(props);
    this.state ={
      show: true
    }
    this.inputRef = React.createRef();
  }

  componentDidMount(){
    // console.log(this.inputRef.current);
    // this.inputRef.current.focus();
    // console.log(this.inputRef.current.focus());
  }
  render() {
    return (
      <>
        {this.state.show && <Home list={[{ name: 1 }, { name: 2 }]} />}
        <div onClick={() => this.setState({show: false})}>close</div>
      </>
    );
  }
}

export default App;
