import qs from 'qs';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './MainContent.module.scss';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../../redux/Slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../../redux/Slices/pizzaSlice';
import Filters from '../Filters/Filters';
import NotFoundBlock from '../NotFound/NotFoundBlock';
import Pagination from '../Pagination/Pagination';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import Sort from '../Sort/Sort';
import { sortList } from '../Sort/constants';

const MainContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { currentPage, categoryId, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        search,
        category,
        currentPage,
      }),
    );
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((sortItem) => sortItem.sortProperty === params.sortType);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      dispatch(
        fetchPizzas({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.title} {...pizza} pizza={pizza} />);

  return (
    <div>
      <div className={styles.content__top}>
        <Filters value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <div className={styles.content}>
        <h2 className={styles.content__title}>Все пиццы</h2>
        {status === 'error' ? (
          <div>
            <NotFoundBlock />
          </div>
        ) : (
          <div className={styles.content__items}>{status === 'loading' ? <Skeleton /> : pizzas}</div>
        )}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default MainContent;