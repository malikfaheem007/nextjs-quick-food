import Container from "@/components/common/Container";
import FeaturedFood from "@/components/Home/FeaturedFood";
import FeaturedRestaurants from "@/components/Home/FeaturedRestaurants";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Container>
        <HowItWorks />
        <FeaturedFood />
        <FeaturedRestaurants />
      </Container>
    </div>
  );
}
