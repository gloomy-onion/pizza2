import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено :(</h1>
      <br/>
      <p className={styles.description}>К сожалению, данная страница не существует</p>
    </div>
  );
};
