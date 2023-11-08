import React, {useContext} from 'react';
import styles from './Search.module.scss';
import searchIcon from './../img/searchIcon.svg';
import {SearchContext} from '../App';

const Search = () => {
  const {searchValue, setSearchValue} = useContext(SearchContext)

  return (
    <div className={styles.root}>
      <img src={searchIcon} className={styles.icon} alt={'Search Icon'}/>
      <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)}
             placeholder={'Поиск пиццы...'}/>
      {searchValue && (<button onClick={() => setSearchValue('')} className={styles.clearBtn}/>)}
    {/*TODO:  переделать ебаную кнопку*/}
    </div>
  );
};

export default Search;