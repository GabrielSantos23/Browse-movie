import Image from 'next/image';
import Banner from './components/Banners/Banner';
import TrendList from './components/Lists/TrendList';

export default function Home() {
  return (
    <div>
      <Banner urltype={'trending/all/week?'} />
      <TrendList />
    </div>
  );
}
