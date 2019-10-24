import React from 'react';

const defaultProps={
    label:'',
    placeholder:'请输入',
    type:'text',
    style:{},
    name:'',
    value:'',
    disabled:false,
    checked:false,
    handleInputChange:()=>{}
};
const Input = ({
    label,
    placeholder,
    type,
    style,
    disabled,
    name,
    checked,
    value,
    handleInputChange
    })=>{
    if(type==='textarea'){
        return (
            <textarea
              className="Form__Textarea"
              disabled={disabled}
              name={name}
              onChange={handleInputChange}
              style={style}
              value={value}
            >
            </textarea>
        );
    }
    if(type==='radio'){
        return (
            <label>
                <input
                  checked={checked}
                  className="Form__Radio"
                  disabled={disabled}
                  name={name}
                  onChange={handleInputChange}
                  style={style}
                  type={type}
                  value={value}
                />
                {label}
            </label>

        );
    }

    return(
        <label>
            {label}
            <input
              className="Form__Input"
              disabled={disabled}
              name={name}
              onChange={handleInputChange}
              placeholder={placeholder}
              style={style}
              type={type}
              value={value}
            />
        </label>
    );
};

Input.defaultProps = defaultProps;
export default Input;