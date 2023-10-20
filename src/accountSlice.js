// accountSlice
import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    accounts: [],
  },
  reducers: {
    addAccount: (state, action) => {
      state.accounts.push(action.payload);
    },
  },
});

export const { addAccount } = accountSlice.actions;
export default accountSlice.reducer;
