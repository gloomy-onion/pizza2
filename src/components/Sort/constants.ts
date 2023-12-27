export enum SortPropertyEnum {
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  POPULAR_DESC = 'rating',
  POPULAR_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
}

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
