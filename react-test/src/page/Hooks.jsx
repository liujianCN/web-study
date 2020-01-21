/* eslint-disable */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
  useImperativeHandle
} from 'react';
import { ThemeContext } from '../Context/test';

const usePrevious = value => {
  let ref = useRef();
  useEffect(() => {
    ref.current = value;
  })
  return ref.current;
};

const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus()
  }));
  return <input type="text" ref={inputRef} />;
});

const App = () => {
  const [count, setCount] = useState({ count: 3, age: 18 });
  const theme = useContext(ThemeContext);
  const inputRef = useRef(); // ref获取dom
  const interval = useRef(); // ref当作不变的实例
  const isUpdate = useRef(false); // 判断是否是更新阶段
  const previous = useRef(); // 判断是否是更新阶段
  const add = () => {
    setCount(c => ({ ...c, count: c.count + 1 }));
  };
  const close = () => {
    clearInterval(interval.current);
  };
  const handleAlert = () => {
    setTimeout(() => {
      console.log(count);
    }, 3000)
  };

  useEffect(() => {
    previous.current = count.count;
  });

  // usePrevious hooks
  const preValue = usePrevious(count)

  useEffect(() => {
    console.log(isUpdate.current);
    const timer = setInterval(console.log, 1000, '定时器');
    interval.current = timer;
    return () => {
      clearInterval(timer)
    }
  },[]);

  useLayoutEffect(() => {
    console.log('layout');
  });

  useEffect(() => {
    inputRef.current.focus();
    isUpdate.current = true;
  }, []);
  return (
    <>
      <div style={theme.theme}>{count.count}</div>
      <Input ref={inputRef} />
      <button onClick={add}>增加</button>
      <button onClick={close}>停止定时器</button>
      <div>
        count: {count.count}, previous: {previous.current}, preValue: {preValue&&preValue.count}
      </div>
      <button onClick={add}>增加</button>
      <button onClick={handleAlert}>弹框</button>
    </>
  );
};

export default App;
