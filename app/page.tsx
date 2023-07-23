import Image from 'next/image';
import Banner from './components/Banners/Banner';

export default function Home() {
  return (
    <div>
      <Banner urltype={'trending/all/week?'} />
    </div>
  );
}
