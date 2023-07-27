'use client';

import React, { useState, useRef } from 'react';

const ItemCarousel: React.FC = ({ children }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement | null>(null);

  const nextSlide = () => {
    if (slideRef.current) {
      const slideWidth = slideRef.current.clientWidth;
      setCurrentSlide((prevSlide) =>
        prevSlide === children.length - 1 ? 0 : prevSlide + 1
      );
      slideRef.current.style.transform = `translateX(-${
        (currentSlide + 1) * slideWidth
      }px)`;
    }
  };

  const prevSlide = () => {
    if (slideRef.current) {
      const slideWidth = slideRef.current.clientWidth;
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? children.length - 1 : prevSlide - 1
      );
      slideRef.current.style.transform = `translateX(-${
        (currentSlide - 1) * slideWidth
      }px)`;
    }
  };

  return (
    <div className='relative w-full overflow-hidden'>
      <div
        className='flex transition-transform duration-300'
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        ref={slideRef}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className='w-full'>
            {child}
          </div>
        ))}
      </div>
      <button
        className='absolute top-1/2 left-2 transform -translate-y-1/2'
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button
        className='absolute top-1/2 right-2 transform -translate-y-1/2'
        onClick={nextSlide}
      >
        &gt;
      </button>
    </div>
  );
};

export default ItemCarousel;
