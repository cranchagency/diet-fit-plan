import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Salad, Instagram, Facebook, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetPlan = () => {
    navigate('/quiz');
  };

  const isOfferPage = location.pathname === '/offer';

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
            <Link to="/faq" className="text-gray-600 hover:text-green-500 transition-colors">Вопрос-ответ</Link>
            <button 
              onClick={handleGetPlan}
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors font-bold"
            >
              Получить план
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-green-500 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t"
            >
              <div className="max-w-7xl mx-auto px-4 py-4">
                <nav className="flex flex-col gap-4">
                  <Link 
                    to="/" 
                    className="text-gray-600 hover:text-green-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Главная
                  </Link>
                  <Link 
                    to="/articles" 
                    className="text-gray-600 hover:text-green-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Статьи
                  </Link>
                  <Link to="/faq" className="text-gray-600 hover:text-green-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Вопрос-ответ</Link>
                  <button 
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/quiz');
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors w-full"
                  >
                    Получить план
                  </button>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <Link to="/" className="flex items-center gap-2 text-gray-900 mb-4">
                <Salad className="w-8 h-8" />
                <span className="font-bold text-xl">DIET FIT PLAN</span>
              </Link>
              <p className="text-gray-600 max-w-xs">
                Персональные планы питания с учетом ваших целей и предпочтений
              </p>
              <div className="mt-4 text-sm text-gray-500">
                <p>ИНН: 164492425170</p>
                <p>ОГРНИП: 320169000098242</p>
                <p className="mt-4"><a href="mailto:support@dietfit-plan.ru" className="text-green-600 hover:text-green-700">support@dietfit-plan.ru</a></p>
              </div>
              <p className="mt-4 text-xs text-gray-400 max-w-[280px]">
                Стоимость подбора индивидуального плана составляет 89 рублей. Оплата производится банковской картой Visa, Mastercard или МИР.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Навигация</h4>
                <nav className="flex flex-col gap-2">
                  <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Главная</Link>
                  <Link to="/articles" className="text-gray-600 hover:text-gray-900 transition-colors">Статьи</Link>
                  <Link to="/faq" className="text-gray-600 hover:text-gray-900 transition-colors">Вопрос-ответ</Link>
                  <Link to="/legal" className="text-gray-600 hover:text-gray-900 transition-colors">Документация</Link>
                  <Link to="/support" className="text-gray-600 hover:text-gray-900 transition-colors">Тех. поддержка</Link>
                </nav>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-600">
            <p>© 2024 FoodPlan. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}