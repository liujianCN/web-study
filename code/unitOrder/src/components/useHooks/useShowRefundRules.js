import { useState, useCallback } from 'react';
const useShowRefundRules = () => {
  const [rulesInfo, setRules] = useState({});
  const [enteredIndex, setIndex] = useState('');
  const toggleMouse = useCallback(
    function toggleRefundRule(index, rules) {
      console.log(index);
      console.log('index-----');
      if (rules) {
        setRules(rules);
        setIndex(index);
      } else {
        setIndex('');
      }
    }, []);
  return [
    enteredIndex,
    rulesInfo,
    toggleMouse
  ];
};
export default useShowRefundRules;