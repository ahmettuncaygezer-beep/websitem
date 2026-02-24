import { HeroSection } from '@/components/home/HeroSection';
import { BentoCategories } from '@/components/home/BentoCategories';
import { ShopTheRoom } from '@/components/home/ShopTheRoom';
import { NewArrivals } from '@/components/home/NewArrivals';
import { TrustBand } from '@/components/home/TrustBand';
import { PersonalizedShowcase } from '@/components/home/PersonalizedShowcase';
import { RoomScanner } from '@/components/home/RoomScanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BentoCategories />
      <NewArrivals />
      <PersonalizedShowcase />
      <RoomScanner />
      <ShopTheRoom />
      <TrustBand />
    </>
  );
}
