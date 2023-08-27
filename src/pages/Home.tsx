import React from 'react';
import { useApiData } from '../hooks/ProductApi';

export const Home = () => {
  const apiKey = process.env.REACT_APP_API_KEY as string;
  console.log(apiKey);
  const apiURL = 'https://spanishinquisition.victorianplumbing.co.uk/interviews/listings';
  const requestPayload = {
    query: 'toilets',
  };

  
   
  const { data, loading, error } = useApiData({ apiURL, apiKey, requestPayload });
console.log(data);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>; 
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return <h1 className='text-red'>this is the homepage</h1>;
};
