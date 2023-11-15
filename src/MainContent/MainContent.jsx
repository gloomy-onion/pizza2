import React, {useContext, useEffect, useRef, useState} from 'react';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import styles from './MainContent.module.scss';
import Skeleton from '../PizzaBlock/Skeleton';
import Filters from '../Filters/Filters';
import Sort from '../Sort/Sort';
import {API_URL} from '../common/constants';
import Pagination from '../Pagination/Pagination';
import {SearchContext} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoryId, setCurrentPage, setFilters} from '../redux/Slices/filterSlice';
import axios from 'axios';
import qs from 'qs';
import {useNavigate} from 'react-router-dom';
import {sortList} from '../Sort/constants';

const MainContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const {searchValue} = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios.get(`${API_URL}pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`).then(res => {
      setItems(res.data);
      setIsLoading(false);
    });
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
      fetchPizzas();
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
        <div className={styles.content__items}>
          {isLoading
            ? (<Skeleton/>)
            : pizzas
          }
        </div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  );
};

export default MainContent;