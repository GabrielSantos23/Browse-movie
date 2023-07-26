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
import useLoading from '@/hooks/HomeLoader';
import PosterItem from '../Items/PosterItem';
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
  type?: string;
}

const TrendList: React.FC<ItemsCarouselProps> = ({
  explore,
  urltype,
  title,
  url,
  serie,
  type,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${urltype}`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );
      {
        response?.data?.results
          ? setItems(response?.data?.results)
          : setItems(response?.data?.cast);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center mb-8 md-5'>
          <h1 className='text-3xl font-bold'>{title}</h1>
          {explore && <p className='text-custom-dark-gray'>View all</p>}
        </div>
        <div className=''>
          <Carousel>
            {items.slice(0, 10).map((item, index) => {
              const lastIndex = 9; // Último índice do slice (0 a 10 = 11 itens, mas o índice 9 é o último)

              return (
                <div key={index} className='flex items-center'>
                  <h1
                    className={`md:flex hidden h1test text-[200px] cursor-default font-bold z-[-1] ${
                      index > 0 ? '-mr-8' : '' // Aplica -mr-8 em todos, exceto no primeiro
                    } ${index === lastIndex ? '-mr-24' : ''}`} // Aplica -mr-16 apenas no último índice
                  >
                    {index + 1}
                  </h1>
                  <div className='z-[1]'>
                    <PosterItem item={item} type={type} url={url} />
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default TrendList;
