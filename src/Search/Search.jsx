import React, {useCallback, useRef, useState} from 'react';
import styles from './Search.module.scss';
import searchIcon from './../img/searchIcon.svg';
import debounce from 'lodash.debounce';
import {useDispatch} from 'react-redux';
import {setSearchValue} from '../redux/Slices/filterSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef();
  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };
  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(setSearchValue(value));
    }, 500), []
  );
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <img src={searchIcon} className={styles.icon} alt={'Search Icon'}/>
      <input ref={inputRef} value={value} onChange={onChangeInput}
             placeholder={'Поиск пиццы...'}/>
      {value && (<button onClick={onClickClear} className={styles.clearBtn}/>)}
    </div>
  );
};

export default Search;