import React, { ChangeEvent } from 'react';

interface SortFilterProps {
    value: number;
    onChange: (value: number) => void;
  }

const SortFilter = ({ value, onChange }:SortFilterProps) => {
    const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
        onChange(Number(event.target.value));
      };


  return (
    <div className='px-5 flex justify-between py-3 border-[#71c16a] border-[1.5px]'>
    <select  className ="tracking-widest flex w-full justify-between" value={value} onChange={handleSortChange}>
      <option  value={1}>Recommended</option>
      <option value={2}>Price Low to High</option>
      <option value={3}>Price High to Low</option>
      <option value={4}>Largest Discount</option>
    </select>
    </div>
  );
};

export default SortFilter;