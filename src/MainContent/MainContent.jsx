import React, {useContext, useEffect, useState} from 'react';
import PizzaBlock from '../PizzaBlock/PizzaBlock';
import styles from './MainContent.module.scss';
import Skeleton from '../PizzaBlock/Skeleton';
import Filters from '../Filters/Filters';
import Sort from '../Sort/Sort';
import {API_URL} from '../common/constants';
import Pagination from '../Pagination/Pagination';
import {SearchContext} from '../App';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoryId} from '../redux/Slices/filterSlice';
import axios from 'axios';

const MainContent = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const {searchValue} = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };


  useEffect(() => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    axios.get(`${API_URL}pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`).then(res => {
      setItems(res.data);
      setIsLoading(false);
    });
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
      <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </div>
  );
};

export default MainContent;