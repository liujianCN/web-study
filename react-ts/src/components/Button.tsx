import React, { Component } from 'react';

interface Props {
  width: number | string,
  height: number | string,
  onClick(e: MouseEvent): () => void
}

interface State {
  show: boolean
}

class Button extends Component<Props, State> {

  static defaultProps = {
    width: 30,
    height: 40,
    onClick: () => {}
  }

  render() {
    const {
      width,
      height
    } = this.props;
    return (
      <div className="button">
        {width},{height}
      </div>
    )
  }
}

export default Button;
