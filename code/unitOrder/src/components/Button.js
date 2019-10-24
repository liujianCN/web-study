import React from 'react';
const defaultProps = {
  type:'primary',
  disabled:false,
  ghost:false
};

const Button = ( props ) => {
  return (
    <button
      className={`Button__Container Button__Container--${props.type} ${props.ghost ? 'Button__Container--ghost':''}`}
      disabled={props.disabled}
      onClick={props.handleClick}
      style={props.style}
    >
        <label className="Button__Text">
            {props.children}
        </label>
    </button>
  );
};

Button.defaultProps = defaultProps;
export default Button;