import qs from 'qs';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './MainContent.module.scss';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../../redux/Slices/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../../redux/Slices/pizzaSlice';
import { useAppDispatch } from '../../redux/store';
import Filters from '../Filters/Filters';
import NotFoundBlock from '../NotFound/NotFoundBlock';
import Pagination from '../Pagination/Pagination';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import SortPopup from '../Sort/Sort';
import { sortList } from '../Sort/constants';

const MainContent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  // @ts-ignore
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const { currentPage, categoryId, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
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
        currentPage: String(currentPage),
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
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((sortItem) => sortItem.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
      dispatch(fetchPizzas({} as SearchPizzaParams));
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

  const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.title} {...pizza} pizza={pizza} />);

  return (
    <div>
      <div className={styles.content__top}>
        <Filters value={categoryId} onClickCategory={onChangeCategory} />
        <SortPopup />
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