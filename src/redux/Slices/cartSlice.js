import {createSlice} from '@reduxjs/toolkit';

const initialState = {

};


const cartSlice = createSlice(
  {
    name: 'filters',
    initialState,
    reducers: {

    }
  }
);

export const {setCategoryId, setSort, setCurrentPage, setFilters} = cartSlice.actions;

export default cartSlice.reducer;