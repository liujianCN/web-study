/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import indexJS from 'indexJS'
//import './modal.css';
const DialogTypes = {
  ALERT: 'alert',
  CONFIRM: 'confirm'
}
const Alert = ({ onClose, title = '提示', content, coloseButtonText = 'OK', okButtonText = '确定' }) => {
  return (
    <div className="modal_alert_area">
      <div className="modal_alert_content">
        {title && (
          <p className="modal_alert_content_title">
            <span>{title}</span>
            <i
              className="modal_alert_close_icon"
              onClick={() => {
                if (onClose) onClose();
              }}
              style={{
                backgroundImage: `url(${indexJS.closeBtnAtModalURL})`
              }}
            ></i>
          </p>
        )}
        <div className="modal_alert_content_text">
          {content}
        </div>
        <div className="modal_alert_close_btn">
          <button
            onClick={() => {
              if (onClose) onClose();
            }}
          >{coloseButtonText}</button>
        </div>
      </div>
    </div>
  );
}
const Confirm = ({ onClose, onOk, title = '提示', content, coloseButtonText = '取消', okButtonText = '确定' }) => {
  return (
    <div className="modal_alert_area">
      <div className="modal_alert_content">
        {title && (
          <p className="modal_alert_content_title">
            <span>{title}</span>
            <i
              className="modal_alert_close_icon"
              onClick={() => {
                if (onClose) onClose();
              }}
              style={{
                backgroundImage: `url(${indexJS.closeBtnAtModalURL})`
              }}
            ></i>
          </p>
        )}
        <div className="modal_alert_content_text">
          {content}
        </div>
        <div className="modal_alert_close_btn">
          <button
            onClick={() => {
              if (onClose) onClose();
            }}
          >{coloseButtonText}</button>
          <button
            onClick={() => {
              if (onOk) onOk();
            }}
          >{okButtonText}</button>
        </div>
      </div>
    </div>
  );
}
/**
 * 
 * @param {type}  
 * @param {onCancel}  取消回调
 * @param {onConfirm}  确认回调
 */
const Modal = ({ type, onCancel, onConfirm, title, content, okButtonText, cancelButtonText, removeDialog }) => {
  const [visible, setVisible] = useState(true);
  const [marginTop, setMarginTop] = useState(0)
  const ref = useRef();
  //const divModal = useRef();
  console.log('visible')
  useEffect(() => {
    setVisible(true)
    setMarginTop(parseInt(ref.current.clientHeight / 2));
  }, [])
  useEffect(() => {
    if (!visible) {
      removeDialog()
    }
  }, [visible])

  function onOk() {
    if (onConfirm) onConfirm();
    setVisible(false)
  }
  function onClose() {
    if (onCancel) onCancel();
    setVisible(false)
  }

  function renderDialogForType(type, props) {
    switch (type) {
      case DialogTypes.ALERT:
        return <Alert {...props} />;
      case DialogTypes.CONFIRM:
        return <Confirm {...props} />;
      default:
        throw new Error('dialog type error');
    }
  }
  return visible && (
    <div className="modal_area_wrapper">
      <div
        className="modal_area"
        ref={ref}
        style={{
          marginTop: -marginTop + 'px'
        }}
      >
        {
          renderDialogForType(type, {
            title,
            content,
            cancelButtonText,
            okButtonText,
            onOk,
            onClose
          }
          )
        }
      </div>
    </div>
  )

}
function renderModal(params) {
  const div = document.createElement('div');
  document.body.appendChild(div)
  return ReactDOM.render(<Modal
    {...params}
    removeDialog={() => {
      ReactDOM.unmountComponentAtNode(div)
      document.body.removeChild(div)
    }}
  />, div)
}

export default {
  alert(params) {
    renderModal({ type: DialogTypes.ALERT, ...params })
  },
  confirm(params) {
    renderModal({ type: DialogTypes.CONFIRM, ...params })
  }
};