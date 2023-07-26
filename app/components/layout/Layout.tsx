import React from 'react';
import Sidebar from '../sidebar/sidebar';
import MobileMenu from '../sidebar/MobileMenu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=''>
      <Sidebar />
      <div className='md:py-6  md:px-16'>{children}</div>
      <MobileMenu />
    </div>
  );
};

export default Layout;
