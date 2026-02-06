import { NavBar } from './components/NavBar';
import { HomeSection } from './components/sections/HomeSection';
import { AboutSection } from './components/sections/AboutSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { PricingSection } from './components/sections/PricingSection';
import { PackagesSection } from './components/sections/PackagesSection';
import { ContactSection } from './components/sections/ContactSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main>
        <HomeSection />
        <AboutSection />
        <PortfolioSection />
        <PricingSection />
        <PackagesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
