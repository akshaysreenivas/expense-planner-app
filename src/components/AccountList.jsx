import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAccount } from '../accountSlice';

const AccountList = () => {
  // Retrieving the list of accounts from Redux store
  const accounts = useSelector((state) => state.account.accounts);
  const dispatch = useDispatch();

  const count=accounts.length

  const [newAccount, setNewAccount] = useState('');

  const handleAccountChange = (e) => {
    setNewAccount(e.target.value);
  };

  const handleAddAccount = () => {
    if (newAccount.trim() !== '') {
      // Dispatching  addAccount action to add a new account to the Redux store
      dispatch(addAccount({ id: Date.now(), balance: parseFloat(newAccount) }));
      setNewAccount(''); 
    }
  };

  return (
    <div className="account-list">
      <h1>Accounts</h1>
      <h4>Count : {count}</h4>
      <div>
        <label htmlFor="new-account-input">Balance : </label>
        <input
        
          type="number"
          id="new-account-input"
          value={newAccount}
          onChange={handleAccountChange}
        />
        <button className='submit-button' onClick={handleAddAccount}>Submit</button>
      </div>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
          Balance : ₹ {account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountList;
