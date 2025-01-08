import { Navigation } from "@/components/01-navigation";
import { HeroSection } from "@/components/02-hero-section";
import { FeaturesSection } from "@/components/03-features-section";
import { LatestProducts } from "@/components/04-latest-products";
import { YouTubeSection } from "@/components/05-youtube-section";
import { OurBest } from "@/components/06-our-best";
import { NewsSection } from "@/components/07-news-section";
import TeamSection from "@/components/08-team-section";
import { GetInTouch } from "@/components/09-get-in-touch";
import { Footer } from "@/components/10-footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="products">
        <LatestProducts />
      </section>
      <YouTubeSection />
      <OurBest />
      <NewsSection />
      <section id="team">
        <TeamSection />
      </section>
      <section id="about">
        <GetInTouch />
      </section>
      <Footer />
    </main>
  );
}
