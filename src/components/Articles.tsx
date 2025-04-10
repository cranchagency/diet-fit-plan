import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Eye, ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  readTime: number;
  views: number;
  slug: string;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Как запустить метаболизм: 7 научно доказанных способов',
    description: 'Узнайте, как естественным образом ускорить обмен веществ и начать эффективно терять вес без жестких диет.',
    image: 'https://images.unsplash.com/photo-1486218119243-13883505764c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    readTime: 5,
    views: 1240,
    slug: 'how-to-boost-metabolism'
  },
  {
    id: '2',
    title: 'Интуитивное питание: как научиться слушать свое тело',
    description: 'Практические советы по переходу на интуитивное питание и формированию здоровых отношений с едой.',
    image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    readTime: 7,
    views: 856,
    slug: 'intuitive-eating'
  },
  {
    id: '3',
    title: '10 простых способов уменьшить калорийность блюд',
    description: 'Эффективные кулинарные приемы, которые помогут сделать любимые блюда менее калорийными без потери вкуса.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    readTime: 4,
    views: 1567,
    slug: 'reduce-calories'
  },
  {
    id: '4',
    title: 'Правильный перекус: что есть между приемами пищи',
    description: 'Список полезных перекусов, которые помогут контролировать голод и поддерживать стабильный уровень энергии.',
    image: 'https://images.unsplash.com/photo-1511690078903-71dc5a49f5e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    readTime: 6,
    views: 923,
    slug: 'healthy-snacks'
  },
  {
    id: '5',
    title: 'Как справиться с эмоциональным перееданием',
    description: 'Практические стратегии и техники, которые помогут разорвать связь между эмоциями и приемом пищи.',
    image: 'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    readTime: 8,
    views: 2104,
    slug: 'emotional-eating'
  },
  {
    id: '6',
    title: 'Планирование питания: как составить меню на неделю',
    description: 'Пошаговое руководство по планированию здорового питания, которое поможет сэкономить время и деньги.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    readTime: 6,
    views: 1832,
    slug: 'meal-planning'
  }
];

export default function Articles() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Полезные статьи о здоровом питании
          </h1>
          <p className="text-xl text-gray-600">
            Актуальные советы и рекомендации для достижения ваших целей
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{article.readTime} мин</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="w-4 h-4 mr-1" />
                    <span>{article.views}</span>
                  </div>
                </div>
                <Link
                  to={`/articles/${article.slug}`}
                  className="mt-4 inline-flex items-center text-green-500 hover:text-green-600 transition-colors"
                >
                  Читать далее
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}