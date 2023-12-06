import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from '../../common/constants';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

export type SearchPizzaParams = {
sortBy: string;
order: string;
category: string;
search: string;
currentPage: string;
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams | undefined>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    // @ts-ignore
    // я тут не поняла если честно как делать а дурацкими вопросами заебывать не хочу
    const { sortBy, order, search, category, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `${API_URL}pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});
export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
