import React, { useState } from 'react';

interface PaginationProps {
  totalItems: number ;
  itemsPerPage: number;
  currentPage: number;
  nextPage: () => void;
  prevPage: () => void;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  prevPage,
  nextPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber) => (
        <>

        <div
          key={pageNumber}
          className={pageNumber === currentPage ? 'active' : 'hidden'}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </div>

        </>
      ))}
    </div>
  );
};
