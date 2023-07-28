'use client';

import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const ItemCard = ({ item, Backdrop }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  return (
    <div className='absolute inset-0 hover:scale-125 transition duration-150 flex bg-black bg-opacity-75 z-10 '>
      <div className=' mx-auto  rounded-t-lg bg-[#181818] '>
        <LazyLoadImage
          className={` 
              rounded-t-lg  md:min-h-[190px] min-h-[250px]
              `}
          src={
            Backdrop.file_path
              ? `https://image.tmdb.org/t/p/original${Backdrop.file_path}`
              : item.backdrop_path
              ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
              : item.profile_path
              ? `https://image.tmdb.org/t/p/original${item.profile_path}`
              : '/assets/placeholderwide.png'
          }
          alt={item.title || item.name}
          threshold={0}
          effect='opacity'
          afterLoad={handleImageLoad}
          placeholderSrc='/assets/placeholder.png'
        />
        <h2 className='text-xl font-bold mb-2 px-2'>
          {item.title || item.name}
        </h2>
        <p className='text-gray-500 bg-[#181818] px-2 '>
          {item.release_date || item.first_air_date}
        </p>
        <p className='text-gray-600 bg-[#181818] rounded-b-lg px-2 line-clamp-5 mb-5 pb-5'>
          {item.overview}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
