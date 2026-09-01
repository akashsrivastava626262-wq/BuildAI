import AnnouncementBar from './components/AnnouncementBar'
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
      <AnnouncementBar />
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

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-mist/50 bg-white/90 p-3 backdrop-blur-xl md:hidden">
        <a
          href="#cta"
          className="btn-primary block w-full rounded-xl py-3.5 text-center text-sm font-semibold text-white"
        >
          Enquire Now
        </a>
      </div>
    </>
  )
}

export default App
