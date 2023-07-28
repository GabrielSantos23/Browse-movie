'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { SidebarItems } from '@/app/data/SidebarData';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import Input from '../Inputs/Input';
import Input2 from '../Inputs/Input2';
import SearchInput from '../Inputs/SearchInput';

const Sidebar = () => {
  const pathname = usePathname();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarAtTop, setIsSidebarAtTop] = useState(true);
  const searchRef = useRef(null);
  const toggleSearch = () => {
    setIsSearchVisible((prevState) => !prevState);
  };

  // Function to handle scroll event
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsSidebarAtTop(scrollTop === 0);
  };

  // Listen for scroll events
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <motion.div
      className={`w-full px-16  flex-col fixed   items-center md:flex hidden z-[99999]   justify-between `}
      initial={{ y: 0 }} // Set the initial position of the sidebar (at the top)
      animate={{ y: isSidebarAtTop ? 0 : 15 }} // Animate the sidebar position based on isSidebarAtTop state
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      <div
        className={`flex justify-between px-5 rounded-lg transition duration-200 h-[80px] md:w-2/4 bg-[#080808]   items-center ${
          !isSidebarAtTop ? '  ' : ''
        }`}
      >
        <div className='text-3xl'>seenema</div>
        <div className='flex justify-between w-2/4'>
          {SidebarItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <div key={index} className=''>
                <p className='capitalize font-light '>{item.name}</p>
              </div>
            );
          })}
        </div>
        <div className='flex items-center'>
          <button className='mr-5' onClick={toggleSearch}>
            <BiSearch size={20} />
          </button>
          <img
            src='/assets/placeholder.jpg'
            className='w-8 h-8 rounded-full'
            alt=''
          />
          <IoIosArrowDown />
        </div>
      </div>
      <AnimatePresence>
        {isSearchVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            ref={searchRef}
            className=' rounded-lg p-2 flex justify-center w-full z-[999]'
          >
            <SearchInput />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Sidebar;
