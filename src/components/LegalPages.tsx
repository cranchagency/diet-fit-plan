import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Home } from 'lucide-react';

const legalPages = {
  'public-offer': {
    title: 'Публичная оферта',
    pdfUrl: '/offerta.pdf'
  },
  'privacy-consent': {
    title: 'Согласие на обработку персональных данных',
    pdfUrl: '/soglasie_na_obrabotky.pdf'
  },
  'privacy-disclaimer': {
    title: 'Оговорка на частность',
    pdfUrl: '/ogovorka_na_chastnost.pdf'
  },
  'privacy-policy': {
    title: 'Положение об безопасности персональных данных',
    pdfUrl: '/polozhenie_ob_bezopasnosti.pdf'
  },
  'tariffs': {
    title: 'Тарифы',
    pdfUrl: '/tarifs.pdf'
  }
};

export default function LegalPages() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-green-500 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Главная
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Общие условия</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Общие условия</h1>
          
          <div className="grid gap-4">
            {Object.entries(legalPages).map(([key, { title, pdfUrl }]) => (
              <a
                key={key}
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-gray-900">{title}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}