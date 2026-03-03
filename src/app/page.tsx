import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import FlashSaleStrip from '@/components/Marketing/FlashSaleStrip';
import { ShopTheRoom } from '@/components/home/ShopTheRoom';
import { NewArrivals } from '@/components/home/NewArrivals';
import { TrustBand } from '@/components/home/TrustBand';
import { PersonalizedShowcase } from '@/components/home/PersonalizedShowcase';
import StatsCounter from '@/components/SocialProof/StatsCounter';
import MediaLogos from '@/components/SocialProof/MediaLogos';
import InstagramFeed from '@/components/SocialProof/InstagramFeed';
import TrustBadges from '@/components/SocialProof/TrustBadges';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FlashSaleStrip />
      <NewArrivals />

      {/* Sosyal Kanıtlar — İstatistikler */}
      <StatsCounter />

      <PersonalizedShowcase />
      {/* Sosyal Kanıtlar — Medya & Instagram */}
      <MediaLogos />
      <InstagramFeed />

      <ShopTheRoom />
      <TrustBand />

      {/* Sosyal Kanıtlar — Güven Rozetleri (Footer'dan önce) */}
      <TrustBadges />
    </>
  );
}
