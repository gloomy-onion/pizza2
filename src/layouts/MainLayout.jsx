import React from 'react';
import styles from '../App.module.scss';
import Header from '../components/Header/Header';
import {Outlet} from 'react-router-dom';


const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <Outlet/>
    </div>
  );
};

export default MainLayout;