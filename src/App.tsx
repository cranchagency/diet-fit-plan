import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Menu, Salad } from 'lucide-react';
import Layout from './components/Layout';
import Landing from './components/Landing';
import Quiz from './components/Quiz';
import Loading from './components/Loading';
import Results from './components/Results';
import Offer from './components/Offer';
import Success from './components/Success';
import Articles from './components/Articles';
import ArticleContent from './components/ArticleContent';
import LegalPages from './components/LegalPages';
import FAQ from './components/FAQ';
import Support from './components/Support';

// ScrollToTop component
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

// ResultsLayout component
function ResultsLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-green-500">
            <Salad className="w-8 h-8" />
            <span className="font-bold text-xl hidden sm:inline">DIET FIT PLAN</span>
            <span className="font-bold text-xl sm:hidden">DIET FIT PLAN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-green-500 transition-colors">Главная</Link>
            <Link to="/articles" className="text-gray-600 hover:text-green-500 transition-colors">Статьи</Link>
            <Link to="/legal" className="text-gray-600 hover:text-green-500 transition-colors">Общие условия</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => {}}
            className="md:hidden text-gray-600 hover:text-green-500 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        <Results />
      </main>
    </div>
  );
}

function App() {
  const location = useLocation();
  const isResultsPage = location.pathname === '/results';

  // Render Results page with header only
  if (isResultsPage) {
    return (
      <>
        <ScrollToTop />
        <ResultsLayout />
      </>
    );
  }

  // Render all other pages with full Layout
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/success" element={<Success />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticleContent />} />
        <Route path="/legal" element={<LegalPages />} />
        <Route path="/legal/:slug" element={<LegalPages />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Layout>
  );
}

export default App