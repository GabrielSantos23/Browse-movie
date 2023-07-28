import Image from 'next/image';
import Banner from './components/Banners/Banner';
import TrendList from './components/Lists/TrendList';
import List from './components/Lists/List';

export default function Home() {
  return (
    <div className='mt-14'>
      <Banner urltype={'trending/all/week?'} />
      <div className='mt-10'>
        <List
          urltype='trending/movie/week?'
          title='Popular Movies'
          type={'movie'}
          explore
        />
        <List
          urltype={'trending/tv/week?'}
          title='Trending Series'
          type={'tv'}
          explore
        />
        <TrendList
          urltype='trending/all/week?'
          title='Top 10 For the Week'
          type={'movie'}
          explore
        />
      </div>
    </div>
  );
}
