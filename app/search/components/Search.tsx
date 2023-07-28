'use client';

import Item from '@/app/components/Items/Item';
import { apiKey } from '@/envexports';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hasMore, setHasMore] = useState(true);
  const [searchResult, setSearchResult] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page number

  const query = searchParams && searchParams.get('q');
  useEffect(() => {
    if (!query) {
      router.push('/');
      return;
    }

    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${apiKey}&page=${currentPage}`
        );
        if (data.results.length > 0) {
          setSearchResult((prevResults: any) => [
            ...prevResults,
            ...data.results,
          ]);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [query, router, apiKey, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Increment the current page number
  };

  return (
    <>
      <div className='grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 justify-items-center'>
        {searchResult.map((result: any, index: any) => (
          <div
            key={index}
            className='flex  transition duration-200 hover:z-[1] min-w-[350px] md:w-[350px] md:min-w-[350px] md:px-0 px-5  mb-5'
          >
            <Item
              item={result}
              type={
                result.media_type === 'tv'
                  ? `tv`
                  : result.media_type === 'movie'
                  ? `movie`
                  : `person`
              }
              person={
                result.media_type !== 'tv' && result.media_type !== 'movie'
              }
            />
          </div>
        ))}
      </div>
      {hasMore && (
        <div className='flex justify-center mt-5 w-full '>
          <button
            onClick={handleLoadMore}
            className='bg-transparent border border-custom-dark-gray py-2 px-4 text-custom-dark-gray hover:text-custom-gray rounded-md hover:border-custom-gray focus:outline-none'
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default Search;
