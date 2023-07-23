'use client';

import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePathname } from 'next/navigation'; // Corrected import statement
import { SidebarItems } from '@/app/data/SidebarData';
import Link from 'next/link';
import useLoading from '../hooks/loaders/HomeLoader';

const MobileMenu = () => {
  const pathname = usePathname();
  const { isLoading, setLoading } = useLoading();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className='md:hidden bg-[#1E1D22] transition duration-200  fixed bottom-0 w-full  block '>
      <div className='flex items-center p-5   '>
        {SidebarItems.map((item, index) => {
          const isActive = pathname === item.path;

          return (
            item.icon && (
              <Link
                href={item.path}
                className={` flex justify-center items-center  w-full `}
                key={index}
              >
                <FontAwesomeIcon
                  className={`${isActive && 'text-red-500'} bg-[]`}
                  icon={item.icon}
                  width={25}
                />
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
