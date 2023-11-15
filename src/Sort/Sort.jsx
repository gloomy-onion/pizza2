import React, {useEffect, useRef, useState} from 'react';
import styles from './Sort.module.scss';
import {sortList} from './constants';
import {useDispatch, useSelector} from 'react-redux';
import {setSort} from '../redux/Slices/filterSlice';

const Sort = () => {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.filter.sort);
  const sortRef = useRef();
  const [open, setOpen] = useState(false);

  const onClickList = (sortObj) => {
    dispatch(setSort(sortObj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () =>
      document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sort__label}>
        <div className={styles.sortLabel}/>
        <b>Сортировка по: </b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && <div className={styles.sort__popup}>
        <ul>
          {sortList.map((sortItem, i) => (
            <li key={i} onClick={() => onClickList(sortItem)}
                className={sort.sortProperty === sortItem.sortProperty ? styles.active : ''}>{sortItem.name}</li>
          ))}
        </ul>
      </div>}
    </div>
  );
};

export default Sort;