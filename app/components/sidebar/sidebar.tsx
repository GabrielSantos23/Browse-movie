'use client';

import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { SidebarItems } from '@/app/data/SidebarData';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className='px-10 transition duration-200 absolute bg-transparent border-b border-gray-300/10 top-0 w-full backdrop-blur-[2px] flex md:py-7 py-5 z-10 justify-between items-center'>
      <div className='flex gap-10  justify-between items-center'>
        <div>
          <p className=' hidden md:flex font-bold md:text-xl  '>
            <span className='text-red-500 '>Watch</span> Me
          </p>
          <p className=' md:hidden flex font-bold md:text-base  '>
            <img
              src='https://cutewallpaper.org/24/image-placeholder-png/fileportrait-placeholderpng-wikimedia-commons.png'
              width={40}
              height={40}
              className='rounded-md'
            />
          </p>
        </div>
        <div className='md:flex hidden gap-5'>
          {SidebarItems.map((item, index) => {
            const isActive = pathname === item.path;

            return (
              item.name && (
                <Link
                  key={index}
                  href={item.path}
                  className='flex items-center flex-col'
                >
                  <p
                    className={`capitalize ${
                      isActive && 'text-white'
                    } text-gray-400 `}
                  >
                    {item.name}
                  </p>

                  {isActive && (
                    <div className='w-[6px] h-[6px] bg-red-500 rounded-full mt-1'></div>
                  )}
                </Link>
              )
            );
          })}
        </div>
      </div>
      <div>
        <div className='md:flex hidden gap-5'>
          <FaRegUserCircle size={20} />
          <AiOutlineSearch size={20} />
        </div>
      </div>
      <div className='md:hidden  ml-4 w-full '>
        <input
          type='text'
          placeholder='search'
          className='w-full p-2 rounded-md'
        />
      </div>
    </div>
  );
};

export default Sidebar;
