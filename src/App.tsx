import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HomeShowcase from './components/HomeShowcase'
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
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-terracotta focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <Hero />
        <HomeShowcase />
        <ProblemSection />
        <HowItWorks />
        <Features />
        <AIDemo />
        <MidPageCTA />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-mist/50 bg-white/95 p-3 backdrop-blur-xl md:hidden">
        <a
          href="#cta"
          className="btn-primary block w-full rounded-xl py-3.5 text-center text-sm font-semibold text-white"
        >
          Plan My Home
        </a>
      </div>
    </>
  )
}

export default App
