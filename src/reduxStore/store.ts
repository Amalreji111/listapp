import { createSlice, configureStore } from '@reduxjs/toolkit';
import { generateUniqueID } from '../Common/Utils';

interface TableState {
  rows: RowData[];
}

interface RowData {
  id: number;
  name: string;
  address: string;
  pincode: string;
  status: string;
}

const initialState: TableState = {
  rows: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addRow: (state, action) => {
      state.rows.push({id:generateUniqueID(),...action.payload});
      console.log("I am selected")
    },
    editRow: (state, action) => {
    //   const { id, field, value } = action.payload;
    //   const row :any= state.rows.find((row) => row.id === id);
    //   if (row) {
    //     row[field] = value;
    //   }
    state.rows=action.payload
    },
  },
});

export const { addRow, editRow } = tableSlice.actions;

const store = configureStore({
  reducer: {
    table: tableSlice.reducer,
  },
});

export default store;
