import React from 'react';
import {Outlet} from 'react-router-dom';

import styles from '../App.module.scss';
import Header from '../components/Header/Header';


const MainLayout = () => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <Outlet/>
    </div>
  );
};

export default MainLayout;