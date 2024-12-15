import {Navigation} from '@/components/navigation'
import {HeroSection} from '@/components/hero-section'
import {FeaturesSection} from '@/components/features-section'
import {SectionTransition} from '@/components/section-transition'
import {LatestProducts} from '@/components/latest-products'
import {YouTubeSection} from '@/components/youtube-section'
import {OurBest} from '@/components/our-best'
import {NewsSection} from '@/components/news-section'
import {GetInTouch} from '@/components/get-in-touch'
import { Footer}  from '@/components/footer'
import TeamSection from "@/components/team-section"
import { TestimonialsSection } from '@/components/testimonials-section'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <SectionTransition />
      <section id="products">
        <LatestProducts />
      </section>
      <YouTubeSection />
      <OurBest />
      <NewsSection />
      <section id="team">
      <TeamSection />
      </section>
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      <section id="about">
        <GetInTouch />
      </section>
      <Footer />
    </main>
  )
}

