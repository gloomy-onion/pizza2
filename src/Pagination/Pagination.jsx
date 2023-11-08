import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = (props) => {
  const {onChangePage} = props;

  return (
    <div>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel={'<'}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;