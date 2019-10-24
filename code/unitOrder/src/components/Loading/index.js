import React from 'react';
import loadingpic from 'image/ticketOrder/comm-load.gif';
// import IE_HTC_FILE from '../../assets/css/lib/ie-css3.htc';

class AnimateLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        show: true,
        defaultStyle: true,
        isIE: true
    };
  }

  componentWillMount () {
  }

  render() {

    return (
      <div className={`Loading__wrapper ${this.props.show?'':'loading--hide'}`}>
        <div className="Loading__wrapper_fixedBox"></div>
        <div className="Loading__wrapper_loadingCom">
              <img src={loadingpic}/>
        </div>
      </div>
    );
  }
}

export default AnimateLoading;