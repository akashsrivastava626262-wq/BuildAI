import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PartnerLogos from './components/PartnerLogos'
import StatsSection from './components/StatsSection'
import Features from './components/Features'
import ProcessSection from './components/ProcessSection'
import AIDemo from './components/AIDemo'
import Testimonials from './components/Testimonials'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <PartnerLogos />
        <StatsSection />
        <Features />
        <ProcessSection />
        <AIDemo />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/90 p-3 backdrop-blur-xl md:hidden">
        <a
          href="#cta"
          className="btn-primary block w-full rounded-full py-3.5 text-center text-sm font-semibold"
        >
          Get Started
        </a>
      </div>
    </>
  )
}

export default App
