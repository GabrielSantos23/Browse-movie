'use client';

import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Banner.css';
import { faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import useLoading from '../hooks/loaders/HomeLoader';
import { enUS } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface BannerProps {
  urltype: string;
}
const Banner: React.FC<BannerProps> = ({ urltype }) => {
  const [showImage, setShowImage] = useState(false);
  const [movie, setMovie] = useState<any>({});
  const [numSeasons, setNumSeasons] = useState<number | null>(null);
  const [numReviews, setNumReviews] = useState<number | null>(null);
  const [usRating, setUsRating] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isLoading, setLoading } = useLoading();
  const [genres, setGenres] = useState([]);
  const [genreNames, setGenreNames] = useState([]);
  console.log(movie);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setShowImage(true);
    setTimeout(() => {
      setShowContent(true);
    }, 500);
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/${urltype}api_key=${apiKey}`)
      .then((response) => {
        const results = response.data.results;
        const newIndex = Math.floor(Math.random() * results.length);
        setMovie(results[newIndex]);
        setGenres(results[newIndex].genre_ids);

        setLoading(false);
      });

    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then((response) => {
        const genreList = response.data.genres;
        setGenreNames(genreList);
      });
  }, [apiKey, urltype]);

  const getGenreName = (genreId: any) => {
    const genre = genreNames.find((genre) => genre.id === genreId);
    return genre && genre.name;
  };

  useEffect(() => {
    if (movie && movie.id) {
      const mediaType = movie.media_type === 'tv' ? 'tv' : 'movie';
      axios
        .get(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}/release_dates?api_key=${apiKey}`
        )
        .then((response) => {
          const usRelease = response.data.results.find(
            (release: any) => release.iso_3166_1 === 'US'
          );
          if (usRelease) {
            setUsRating(usRelease.release_dates[0].certification);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [movie, apiKey]);

  useEffect(() => {
    if (movie && movie.id) {
      const mediaType = movie.media_type === 'tv' ? 'tv' : 'movie';
      axios
        .get(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}/reviews?api_key=${apiKey}&language=en-US`
        )
        .then((response) => {
          const numReviews = response.data.total_results;
          setNumReviews(numReviews);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [movie, apiKey]);

  useEffect(() => {
    if (movie && movie.media_type === 'tv') {
      axios
        .get(`https://api.themoviedb.org/3/tv/${movie.id}?api_key=${apiKey}`)
        .then((response) => {
          setNumSeasons(response.data.number_of_seasons);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [movie, apiKey]);

  if (isLoading) {
    return null;
  }

  const formatDate = (dateString: string) => {
    if (!dateString) {
      return '';
    }

    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: enUS });
  };

  return (
    <div>
      <div className='w-full h-[70vh] bg-black'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: imageLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, type: 'linear' }}
          className='flex-end  right-0 flex h-[70vh] md:w-[70%]  '
        >
          <LazyLoadImage
            className='absolute top-0 h-[70vh] w-screen object-cover opacity-70'
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie?.name || movie?.title}
            threshold={0}
            effect='opacity'
            afterLoad={handleImageLoad}
          />
          <div className='md:bg-gradient-to-r bg-gradient-to-t from-black relative   w-full items-center justify-center   h-full  '>
            <div className='w-full flex   flex-col  md:px-32  justify-center  px-10 h-full  '>
              <div className='flex flex-col justify-center'>
                <h1 className='text-4xl line-clamp-2  font-bold'>
                  {movie?.name || movie?.title}
                </h1>
                <div className='flex gap-1 text-gray-400 flex-wrap'>
                  <p>
                    {genres
                      .map((genreId) => getGenreName(genreId))
                      .filter((genreName) => genreName)
                      .join(', ')}
                  </p>
                  <p>
                    {movie &&
                      `${movie.release_date && '|'} ${formatDate(
                        movie.release_date
                      )}`}
                  </p>
                </div>
              </div>

              <div>
                <p className='line-clamp-2 md:w-4/5 mt-5 '>{movie.overview}</p>
              </div>
              <div className='mt-10 flex gap-5 '>
                <button className='bg-[#DC1623] py-2 rounded-md px-3'>
                  {' '}
                  <FontAwesomeIcon icon={faPlay} width={25} />
                  Watch Now
                </button>
                <button className='bg-white text-black rounded-md py-2 px-3'>
                  <FontAwesomeIcon icon={faPlus} width={25} />
                  Add
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
