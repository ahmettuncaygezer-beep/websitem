import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { ShopTheRoom } from '@/components/home/ShopTheRoom';
import { NewArrivals } from '@/components/home/NewArrivals';
import { TrustBand } from '@/components/home/TrustBand';
import { PersonalizedShowcase } from '@/components/home/PersonalizedShowcase';
import { RoomScanner } from '@/components/home/RoomScanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <NewArrivals />
      <PersonalizedShowcase />
      <RoomScanner />
      <ShopTheRoom />
      <TrustBand />
    </>
  );
}
