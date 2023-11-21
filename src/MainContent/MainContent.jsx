import React, {useContext, useEffect, useRef} from 'react';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import styles from './MainContent.module.scss';
import Skeleton from '../PizzaBlock/Skeleton';
import Filters from '../Filters/Filters';
import Sort from '../Sort/Sort';
import Pagination from '../Pagination/Pagination';
import {SearchContext} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoryId, setCurrentPage, setFilters} from '../redux/Slices/filterSlice';
import qs from 'qs';
import {useNavigate} from 'react-router-dom';
import {sortList} from '../Sort/constants';
import {fetchPizzas} from '../redux/Slices/pizzaSlice';
import NotFoundBlock from '../NotFound/NotFoundBlock';

const MainContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const {items, status} = useSelector((state) => state.pizza);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const {searchValue} = useContext(SearchContext);
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
    dispatch(fetchPizzas({
        sortBy, order, search, category, currentPage
      }
    ));
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType,
        categoryId,
        currentPage
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(sortItem => sortItem.sortProperty === params.sortType);
      dispatch(setFilters({
        ...params,
        sort,
      }));
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

  const pizzas = items.map((pizza) => (
    <PizzaBlock
      key={pizza.title}
      {...pizza}
    />
  ));

  return (
    <div>
      <div className={styles.content__top}>
        <Filters value={categoryId} onClickCategory={onChangeCategory}/>
        <Sort/>
      </div>
      <div className={styles.content}>
        <h2 className={styles.content__title}>Все пиццы</h2>
        {
          status === 'error' ? (<div>
              <NotFoundBlock/>
            </div>
          ) : (
            <div className={styles.content__items}>
              {status === 'loading'
                ? (<Skeleton/>)
                : pizzas
              }
            </div>
          )
        }

      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  );
};

export default MainContent;