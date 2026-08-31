import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import AIDemo from './components/AIDemo'
import MidPageCTA from './components/MidPageCTA'
import TrustSection from './components/TrustSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <ProblemSection />
        <HowItWorks />
        <Features />
        <AIDemo />
        <MidPageCTA />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-mist bg-white p-3 md:hidden">
        <a
          href="#cta"
          className="block w-full rounded-lg bg-blue py-3 text-center text-sm font-semibold text-white"
        >
          Start Your Project
        </a>
      </div>
    </>
  )
}

export default App
