'use client';

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './ItemStyle.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Placeholder from '@/public/assets/placeholder';
import { Rating } from '@mui/material';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { motion } from 'framer-motion';
import { BsBookmark, BsFillBookmarkFill, BsFillPlayFill } from 'react-icons/bs';
import useAuthModal from '@/hooks/useAuthModal';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useUser } from '@/hooks/useUser';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { AiFillHeart, AiFillEye } from 'react-icons/ai';

interface ItemProps {
  item: {
    id?: number | string | undefined;
    poster_path?: string | undefined;
    backdrop_path?: string | undefined;
    title?: string | undefined;
    name?: string | undefined;
    vote_average?: number | null | undefined;
    character?: string;
    profile_path?: string | undefined;
    release_date?: string | null | undefined;
    first_air_date?: string | null | undefined;
  };
  type?: string | null;
  person?: boolean;
  url?: string;
  userImage?: boolean;
}

const Item: React.FC<ItemProps> = ({ item, type, person, url, userImage }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [genre, setGenre] = useState<string>('');

  const authModal = useAuthModal();
  const { supabaseClient } = useSessionContext();
  const { user } = useUser();
  const router = useRouter();
  const [Backdrop, setBackdrop] = useState<any>([]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const Ttype = type === 'movie' ? 'liked_movies' : 'liked_tvshows';
    const TypeId = type === 'movie' ? 'movie_id' : 'serie_id';

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from(Ttype)
        .select('*')
        .eq('user_id', user.id)
        .eq(TypeId, item.id)
        .single();

      if (!error && data) {
        setIsFavorite(true);
      }
    };
    fetchData();
  }, [item.id, supabaseClient, user?.id]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (!user) {
      setIsLoading(false);
      return authModal.onOpen();
    }
    const Ttype = type === 'movie' ? 'liked_movies' : 'liked_tvshows';
    const TypeId = type === 'movie' ? 'movie_id' : 'serie_id';

    if (isFavorite) {
      const { error } = await supabaseClient
        .from(Ttype)
        .delete()
        .eq('user_id', user.id)
        .eq(TypeId, item.id);
      if (error) {
        toast.error(error.message);
        setIsLoading(false);
      } else {
        setIsFavorite(false);
        setIsLoading(false);
      }
    } else {
      const { error } = await supabaseClient.from(Ttype).insert({
        [TypeId]: item.id,
        user_id: user.id,
      });
      if (error) {
        toast.error(error.message);
      } else {
        setIsFavorite(true);
        toast.success('Liked');
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchGenre = async () => {
      if (!item.id || !type) return;

      const apiKey = process.env.NEXT_PUBLIC_API_KEY;

      const baseUrl = 'https://api.themoviedb.org/3';

      try {
        const response = await axios.get(
          `${baseUrl}/${type}/${item.id}?api_key=${apiKey}&language=en-US`
        );

        if (response.data.genres && response.data.genres.length > 0) {
          const firstGenreName = response.data.genres[0].name;
          setGenre(firstGenreName);
        } else {
          setGenre('Genre not available');
        }
      } catch (error) {
        console.error('Error fetching genre:', error);
        setGenre('Genre not available');
      }
    };

    fetchGenre();
  }, [item.id, type]);

  const Icon = isFavorite ? BsFillBookmarkFill : BsBookmark;

  const formatVoteAverage = (
    voteAverage: number | undefined | null
  ): string => {
    if (voteAverage !== undefined && voteAverage !== null) {
      return voteAverage.toFixed(1);
    }
    return '';
  };
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const getMoviePhotos = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${type}/${item.id}/images?api_key=${apiKey}`
      );

      const backdropsEn = response.data.backdrops.filter(
        (backdrop: any) => backdrop.iso_639_1 === 'en'
      );

      // Return only the first backdrop, or an empty object if there are no backdrops
      const firstBackdrop = backdropsEn.length > 0 ? backdropsEn[0] : {};

      setBackdrop(firstBackdrop);
    };

    getMoviePhotos();
  }, [item.id]);

  console.log(Backdrop);

  return (
    <div className='flex flex-col'>
      <div className='bg-[#202124] rounded-lg shadow-md'>
        <Link href={`/${type}/${item.id}`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className='relative group  group-hover:transition-all gap-5 flex flex-col'
          >
            <LazyLoadImage
              className={` 
              rounded-lg shadow-md md:min-h-[190px] min-h-[250px]
              `}
              src={
                Backdrop.file_path
                  ? `https://image.tmdb.org/t/p/original${Backdrop.file_path}`
                  : item.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
                  : '/assets/placeholderwide.png'
              }
              alt={item.title || item.name}
              threshold={0}
              effect='opacity'
              afterLoad={handleImageLoad}
              placeholderSrc='/assets/placeholder.png'
            />
            <p className='absolute left-2 top-2 bg-custom-red rounded-xl px-5 text-sm'>
              {formatVoteAverage(item.vote_average)}
            </p>
          </motion.div>
        </Link>
      </div>
      <div className=' mt-5  '>
        <p className='truncate font-semibold'>{item.title || item.name}</p>
        <div className='flex justify-between mt-2'>
          <p className='text-sm text-custom-dark-gray'>{genre}</p>
          <div className='flex gap-3'>
            <button onClick={(e) => handleSubmit(e)}>
              <AiFillEye
                className={` ${
                  isFavorite ? 'text-red-500' : 'text-[#444347]'
                } `}
              />
            </button>
            <button onClick={(e) => handleSubmit(e)}>
              <AiFillHeart
                className={` ${
                  isFavorite ? 'text-red-500' : 'text-[#444347]'
                } `}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
