'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from '../Carousel/Carousel';
import Item from '../Items/Item';
import Link from 'next/link';
import { HiArrowTrendingUp } from 'react-icons/hi2';
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
import { BiSolidMovie, BiTv } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import Button3 from '../Buttons/Button3';
interface Genre {
  id: number;
  name: string;
}

interface ItemsCarouselProps {
  explore?: boolean;
  urltype?: string;
  title?: string;
  url?: string;
  serie?: boolean;
}

const TrendList: React.FC<ItemsCarouselProps> = ({
  explore,
  urltype,
  title,
  url,
  serie,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [trendingType, setTrendingType] = useState('trending/all/week');
  const [genres, setGenres] = useState<Genre[]>([]); // Estado para armazenar a lista de gêneros
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null); // Estado para armazenar o gênero selecionado

  const categoryButtons = [
    {
      type: 'trending/all/week',
      icon: <HiArrowTrendingUp />,
      label: 'Trending',
    },
    {
      type: 'trending/tv/week',
      icon: <BiTv />,
      label: 'TV',
    },
    {
      type: 'trending/movie/week',
      icon: <BiSolidMovie />,
      label: 'Movies',
    },
    {
      type: 'movie/upcoming',
      icon: <AiOutlinePlus />,
      label: 'Upcoming',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${trendingType}`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );

      setItems(response?.data?.results || []);
    };

    fetchData();
  }, [trendingType]);

  useEffect(() => {
    const fetchGenres = async () => {
      const trend =
        trendingType === 'treding/all/week'
          ? 'all'
          : trendingType === 'trending/movie/week'
          ? 'movie'
          : trendingType === 'trending/tv/week'
          ? 'tv'
          : 'upcoming';
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/${trend}/list`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );

      setGenres(response?.data?.genres || []);
    };

    fetchGenres();
  }, [trendingType]);

  const handleGenreChange = (genreId: number) => {
    setSelectedGenre(genreId);
  };

  const filteredItems = selectedGenre
    ? items.filter((item) => item.genre_ids.includes(selectedGenre))
    : items;

  const filteredGenres = genres.filter((genre) => {
    const itemCount = items.filter((item) =>
      item.genre_ids.includes(genre.id)
    ).length;
    return itemCount > 5;
  });

  console.log(items);

  return (
    <>
      {items.length !== 0 && (
        <div
          className={`py-5 
        `}
        >
          <div className='md:px-32 px-3 overflow-auto mb-12'>
            <div className='flex gap-2 pb-5   justify-between  border-b-[#2C2B33] border-b '>
              {categoryButtons.map((button) => (
                <button
                  key={button.type}
                  className={`${
                    trendingType === button.type
                      ? 'text-2xl '
                      : 'text-base text-gray-400'
                  } py-2 px-4 rounded items-center flex flex-col gap-3 transition duration-300`}
                  onClick={() => setTrendingType(button.type)}
                >
                  <div className='flex gap-2 items-center'>
                    {button.icon} {button.label}
                  </div>
                  {trendingType === button.type && (
                    <div className='h-2 w-2 bg-red-500 ml-7 rounded-full'></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className='md:px-32 px-3 overflow-auto'>
            {filteredGenres.length > 0 && (
              <div className='flex gap-2 mb-4'>
                <Button3
                  // className={`${
                  //   selectedGenre === null ? 'bg-sky-500' : 'bg-gray-500'
                  // } py-2 px-4 rounded`}
                  onClick={() => handleGenreChange(null)}
                  selected={selectedGenre === null ? true : false}
                >
                  All Genres
                </Button3>
                {filteredGenres.map((genre) => (
                  <Button3
                    selected={selectedGenre === genre.id ? true : false}
                    key={genre.id}
                    onClick={() => handleGenreChange(genre.id)}
                  >
                    {genre.name}
                  </Button3>
                ))}
              </div>
            )}
          </div>

          <div className='  '>
            <Carousel>
              {filteredItems.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  type={item.title ? 'movie' : 'tv'}
                  url={url}
                />
              ))}
            </Carousel>
          </div>
        </div>
      )}
    </>
  );
};

export default TrendList;
