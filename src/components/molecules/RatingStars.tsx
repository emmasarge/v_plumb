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
    <div className={` ${height} rating-stars flex flex-row h-[1.25em] mx-auto`}>
      {[...Array(starCount)].map((_, index) => (
        <div className='mr-1.5' key={index}>
        <Star />
        </div>
       
      ))}
      {hasHalfStar && (
       <div>
        <HalfStar/>
        </div>
      )}
    </div>
  );
};
