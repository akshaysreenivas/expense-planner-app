import React from 'react';
import './App.css'; 
import AccountList from './components/AccountList';
import RepaymentModel from './components/RepaymentModel';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="left-panel">
          <AccountList />
        </div>
        <div className="right-panel">
          <RepaymentModel />
        </div>
      </div>
    </div>
  );
}

export default App;
