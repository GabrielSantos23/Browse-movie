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
      <body className={inter.className}>
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
