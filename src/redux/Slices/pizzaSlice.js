import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from '../../common/constants';

const initialState = {
  items: [],
  status: 'loading',
};
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async ({params}) => {
  const {sortBy, order, search, category, currentPage} = params;
  const {data} = await axios.get(`${API_URL}pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
  return data;
});

const pizzaSlice = createSlice(
  {
    name: 'pizza',
    initialState,
    reducers: {
      setItems(state, action) {
        state.items = action.payload;
      },
    },
    extraReducers: {
      [fetchPizzas.pending]: (state) => {
        state.status = 'loading';
        state.items = [];
      },
      [fetchPizzas.fulfilled]: (state, action) => {
        state.items = action.payload;
        state.status = 'loading';
      },
      [fetchPizzas.rejected]: (state, action) => {
        state.status = 'error';
        state.items = [];
      },
    }
  }
);

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;