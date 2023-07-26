'use client';

import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { SidebarItems } from '@/app/data/SidebarData';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';
const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className='w-full px-16 h-[80px] fixed   bg-[#080808]  items-center  md:flex hidden  z-[99999] justify-between'>
      <div className='text-3xl'>seenema</div>
      <div className='flex justify-between  w-2/4'>
        {SidebarItems.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <div key={index} className=''>
              <p className='capitalize  font-light '>{item.name}</p>
            </div>
          );
        })}
      </div>
      <div className='flex items-center'>
        <div className='mr-5'>
          <BiSearch size={20} />
        </div>
        <img
          src='/assets/placeholder.jpg'
          className='w-8 h-8 rounded-full'
          alt=''
        />
        <IoIosArrowDown />
      </div>
    </div>
  );
};

export default Sidebar;
