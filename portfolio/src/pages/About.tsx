import AboutHero from "../components/about/AboutHero";
import AboutStory from "../components/about/AboutStory";
import AboutHighlights from "../components/about/AboutHighlights";
import AboutJourney from "../components/about/AboutJourney";

export default function About() {
  return (
    <main className="relative">
      <AboutHero />
      <AboutJourney/>
      <AboutStory />
      <AboutHighlights />
    </main>
  );
}
