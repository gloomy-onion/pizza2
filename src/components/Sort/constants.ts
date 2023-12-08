// eslint-disable-next-line import/no-cycle
import { SortPropertyEnum } from '../../redux/Slices/filterSlice';

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};
export const sortList: SortItem[] = [
  { name: 'популярности ↓', sortProperty: SortPropertyEnum.POPULAR_DESC },
  { name: 'популярности ↑', sortProperty: SortPropertyEnum.POPULAR_ASC },
  { name: 'цене ↓', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене ↑', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту ↓', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту ↑', sortProperty: SortPropertyEnum.TITLE_ASC },
];
