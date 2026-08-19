import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { HomeSkills } from "@/components/home-skills";
import { HomeCta } from "@/components/home-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <HomeSkills />
      <HomeCta />
    </>
  );
}
