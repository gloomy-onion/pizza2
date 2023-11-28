export type SortItem = {
  name: string;
  sortProperty: string;
}
export const sortList: SortItem[] = [
  {name: 'популярности ↓', sortProperty: 'rating'},
  {name: 'популярности ↑', sortProperty: '-rating'},
  {name: 'цене ↓', sortProperty: 'price'},
  {name: 'цене ↑', sortProperty: '-price'},
  {name: 'алфавиту ↓', sortProperty: 'title'},
  {name: 'алфавиту ↑', sortProperty: '-title'}];
