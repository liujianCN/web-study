import { useState, useCallback } from 'react';
const useFocusToggle = () => {
  const [focused, setValue] = useState(false);
  const onFocus = useCallback(function () {
    setValue(true);
  }, []);
  const onBlur = useCallback(function () {
      setValue(false);
  }, []);
  return [
    focused,
    {
      onFocus,
      onBlur
    }
  ];
};

export default useFocusToggle;