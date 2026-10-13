import Hero from './components/Hero';
import Services from './components/Services';
import APropos from './components/APropos';
import Methode from './components/Methode';
import Inspirations from './components/Inspirations';
import Contact from './components/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <APropos />
      <Methode />
      <Inspirations />
      <Contact />
    </main>
  );
}
