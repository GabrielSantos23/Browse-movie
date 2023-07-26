import SupabaseProvider from '@/providers/SupabaseProvider';

// import CustomSwitch from './components/ProgressBar';
import './globals.css';
import { Inter } from 'next/font/google';
import UserProvider from '@/providers/UserProvider';
import ModalProvider from '@/providers/ModalProvider';
import ToasterProvider from '@/providers/ToasterProvider';
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices';
import Sidebar from './components/sidebar/sidebar';
import Layout from './components/layout/Layout';
import localFont from '@next/font/local';

import styles from './Font.module.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: 'Browse Movies, TV Shows and People',
  description: 'A plataform free for you to watch TV shows and Movies',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getActiveProductsWithPrices();
  return (
    <html lang='en'>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icon.png'></link>
        <meta name='theme-color' content='#fff' />
      </head>
      <body className={`${sfProDisplayFonts.className} text-[#f5f6f1] `}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <div className='flex h-full'>
              <Sidebar />
              <div className='w-full '>
                <div>
                  <Layout>{children}</Layout>
                </div>
              </div>
            </div>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

export const sfProDisplayFonts = localFont({
  src: [
    {
      path: '../public/fonts/SF-Pro-Display-Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-BlackItalic.otf',
      weight: '900',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-BoldItalic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Heavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-HeavyItalic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-LightItalic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-MediumItalic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-RegularItalic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-SemiboldItalic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-ThinItalic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: '../public/fonts/SF-Pro-Display-Ultralight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/SF-Pro-Display-UltralightItalic.otf',
      weight: '200',
      style: 'italic',
    },
  ],
  variable: '--font-sfprodisplay',
});
