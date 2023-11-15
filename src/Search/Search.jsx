import React, {useCallback, useContext, useRef, useState} from 'react';
import styles from './Search.module.scss';
import searchIcon from './../img/searchIcon.svg';
import {SearchContext} from '../App';
import debounce from 'lodash.debounce';

const Search = () => {
  const [value, setValue] = useState('');
  const {setSearchValue} = useContext(SearchContext);
  const inputRef = useRef();
  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };
  const updateSearchValue = useCallback(
    debounce((value) => {
      setSearchValue(value);
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