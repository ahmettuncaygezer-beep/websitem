import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/CategorySection';
import { ShopTheRoom } from '@/components/home/ShopTheRoom';
import { NewArrivals } from '@/components/home/NewArrivals';
import { TrustBand } from '@/components/home/TrustBand';
import { PersonalizedShowcase } from '@/components/home/PersonalizedShowcase';
import { RoomScanner } from '@/components/home/RoomScanner';
import StatsCounter from '@/components/SocialProof/StatsCounter';
import MediaLogos from '@/components/SocialProof/MediaLogos';
import InstagramFeed from '@/components/SocialProof/InstagramFeed';
import TrustBadges from '@/components/SocialProof/TrustBadges';
import FlashSaleStrip from '@/components/Marketing/FlashSaleStrip';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* ⚡ Flash Sale — Hero ile Kategori arasında */}
      <FlashSaleStrip />
      <CategorySection />
      <NewArrivals />

      {/* Sosyal Kanıtlar — İstatistikler */}
      <StatsCounter />

      <PersonalizedShowcase />
      <RoomScanner />

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
