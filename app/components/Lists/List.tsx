'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Carousel from '../Carousel/Carousel';
import Item from '../Items/Item';
import useLoading from '@/hooks/HomeLoader';

interface ItemsCarouselProps {
  explore?: boolean;
  urltype: string;
  title?: string;
  type?: string;
  url?: string;
  serie?: boolean;
}
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

const List: React.FC<ItemsCarouselProps> = ({
  explore,
  urltype,
  title,
  type,
  url,
  serie,
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
    <div className='flex flex-col'>
      <div className='flex justify-between items-center mb-8 md-5'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        {explore && <p className='text-custom-dark-gray'>View all</p>}
      </div>
      <div className=''>
        <Carousel>
          {items.map((item) => (
            <Item key={item.id} item={item} type={type} url={url} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default List;
