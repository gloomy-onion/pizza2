import debounce from 'lodash.debounce';
import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Search.module.scss';
import searchIcon from '../../assets/searchIcon.svg';
import { selectFilter, setSearchValue } from '../../redux/Slices/filterSlice';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector(selectFilter);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClickClear = () => {
    dispatch(setSearchValue(''));
    inputRef.current?.focus();
  };
  const updateSearchValue = useCallback(
    debounce((searchValue) => {
      dispatch(setSearchValue(searchValue));
    }, 500),
    [],
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img src={searchIcon} className={styles.icon} alt={'Search Icon'} />
      <input ref={inputRef} value={searchValue} onChange={onChangeInput} placeholder={'Поиск пиццы...'} />
      {searchValue && <button onClick={onClickClear} className={styles.clearBtn} />}
    </div>
  );
};
