import React from 'react';
import Button from './components/Button'


const App: React.FC = () => {
  return (
    <div className="App">
      <Button width={18} height={20}/>
      <Button width='哈哈哈' />
      <Button height='乐乐' />
      <Button />
    </div>
  );
}

export default App;
