import React from 'react';
const defaultProps = {
  icon: '',
  title: ''
};

const Card = ( props ) => {
  return (
    <div className="Card__content">
        {
            <div className="Card__title">
                <div className="Card__title_icon" style={{backgroundImage: 'url(' + props.icon + ')'}}></div>
                <span>{props.title}</span>
            </div>
        }
        <div className="Card__Details">
            {props.children}
        </div>
    </div>
  );
};

Card.defaultProps = defaultProps;
export default Card;