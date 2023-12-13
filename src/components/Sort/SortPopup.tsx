import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Sort.module.scss';
import { SortItem, sortList } from './constants';
import { selectSort, setSort } from '../../redux/Slices/filterSlice';

type ComposedPath = () => Node[];

const SortPopup: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const onClickList = (sortObj: SortItem) => {
    dispatch(setSort(sortObj));
    setOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const event = e as MouseEvent & {
      path: Node[];
      composedPath?: ComposedPath;
    };
    const path = event.path || (e.composedPath && e.composedPath());
    if (path && !path.includes(sortRef.current as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', (e) => handleClickOutside(e));
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sort__label}>
        <div className={styles.sortLabel} />
        <b>Сортировка по: </b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className={styles.sort__popup}>
          <ul>
            {sortList.map((sortItem, i) => (
              <li
                key={i}
                onClick={() => onClickList(sortItem)}
                className={sort.sortProperty === sortItem.sortProperty ? styles.active : ''}
              >
                {sortItem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
