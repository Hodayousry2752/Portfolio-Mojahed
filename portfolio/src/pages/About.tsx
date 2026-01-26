import AboutHero from "../components/about/AboutHero";
import AboutStory from "../components/about/AboutStory";
import AboutHighlights from "../components/about/AboutHighlights";

export default function About() {
  return (
    <main className="relative">
      <AboutHero />
      <AboutStory />
      <AboutHighlights />
    </main>
  );
}
