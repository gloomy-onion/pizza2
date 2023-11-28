import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number,
  onChangePage: any
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const {currentPage, onChangePage} = props;

  return (
    <div>
      <ReactPaginate
        className={styles.pagination}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage - 1}
        previousLabel={'<'}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;