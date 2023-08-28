import React from 'react';
import { ReactComponent as Star } from "../../assets/icons/star.svg"
import { ReactComponent as HalfStar } from "../../assets/icons/half_star.svg"

interface RatingStarsProps {
  rating: number;
  height?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, height }) => {
  const starCount = Math.floor(rating); 
  const hasHalfStar = rating % 1 >= 0.5; 
  return (
    <div className={` ${height} rating-stars  justify-around flex w-10/12 flex-row h-[1.25em] scale-95 `}>
      {[...Array(starCount)].map((_, index) => (
        <div className='mr-1.5' key={index}>
        <Star />
        </div>
       
      ))}
      {hasHalfStar && (
       <div className='scale-95 flex pr-2 '>
        <HalfStar/>
        </div>
      )}
    </div>
  );
};
