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
          urltype='movie/popular'
          title='Popular Movies'
          type={'movie'}
          explore
        />
        <List
          urltype={'trending/tv/week'}
          title='Trending Series'
          type={'tv'}
          explore
        />
      </div>
    </div>
  );
}
