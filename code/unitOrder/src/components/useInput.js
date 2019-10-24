import { useState, useCallback } from 'react';
const useInput = initValue => {
  const [value, setValue] = useState(initValue);
  const handleInputChange = useCallback( e => {
    const target = e.target;
    if(target.type === 'checkbox'){
      const name = target.name;
      const checked = target.checked;
      setValue({[name]:checked});
    }else{
      setValue(target.value);
    }
  }, []);
  return {
    value,
    handleInputChange
  };

};
export default useInput;