import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import {
  ChevronRight,
  Scale,
  Calendar,
  BookOpen,
  Brain,
  Clock,
  ShoppingCart,
  Replace,
  HeadphonesIcon,
  Users,
  Instagram,
  Send,
  Star,
  Timer,
  Utensils,
  LineChart,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Heart,
  Sparkles,
  Play,
  Volume2,
  VolumeX,
  Target
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Landing() {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  const startQuiz = () => {
    navigate('/quiz');
  };

  const handleVideoClick = () => {
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
  };

  return (
    <div className="font-manrope">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 min-h-[700px] items-center">
            {/* Left Column - Content */}
            <div className="pt-24 lg:pt-0 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Худейте до 8 кг в месяц!
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Персональный план питания от ИИ за 2 минуты
                </h1>
                
                <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                  Пройдите анкету, и&nbsp;наш искусственный интеллект рассчитает вашу норму калорий и&nbsp;составит план питания персонально для&nbsp;вас.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <button
                    onClick={startQuiz}
                    className="w-full sm:w-auto h-[56px] bg-green-500 text-white text-lg font-semibold px-8 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center group pulse-button"
                  >
                    Начать сейчас
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={handleVideoClick}
                    className="w-full sm:w-auto h-[56px] bg-white text-green-600 text-lg font-semibold px-8 rounded-full hover:bg-green-50 border-2 border-green-500 transition-all duration-300 inline-flex items-center justify-center group"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Смотреть промо
                  </button>
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-3 gap-4">
                  <div className="bg-green-50/80 rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">1000+</div>
                    <div className="text-sm text-gray-600">Довольных клиентов</div>
                  </div>
                  <div className="bg-green-50/80 rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">86%</div>
                    <div className="text-sm text-gray-600">Достигают цели</div>
                  </div>
                  <div className="bg-green-50/80 rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">10тыс</div>
                    <div className="text-sm text-gray-600">Рецептов&nbsp;в базе</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Images */}
            <div className="relative h-[500px] lg:h-[700px]">
              <div className="absolute inset-0 grid grid-cols-2 gap-4 p-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="relative rounded-2xl overflow-hidden h-48 shadow-lg">
                    <img
                      src="/food3.webp"
                      alt="Здоровая еда"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-64 shadow-lg">
                    <img
                      src="/food4.webp"
                      alt="Здоровая еда"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4 pt-8"
                >
                  <div className="relative rounded-2xl overflow-hidden h-64 shadow-lg">
                    <img
                      src="/food5.webp"
                      alt="Здоровая еда"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative rounded-2xl overflow-hidden h-48 shadow-lg">
                    <img
                      src="/food6.webp"
                      alt="Здоровая еда"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Info Section */}
      <section className="py-16 px-4 bg-white mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Рецепты со всего интернета в одном месте
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Собранные, отобранные и&nbsp;улучшенные искусственным интеллектом и&nbsp;проверенные нашими нутрициологами
          </p>
          <div className="inline-flex items-center bg-green-50 px-6 py-3 rounded-full">
            <span className="text-2xl font-bold text-green-600 mr-2">10 000+</span>
            <span className="text-gray-700">рецептов</span>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-16 px-4 bg-white mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Устали от диет, которые не работают?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-red-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Scale className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-gray-800 font-medium">
                  Вес застыл на месте, и ничего&nbsp;не помогает?
                </p>
              </div>
              <div className="bg-red-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Utensils className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-gray-800 font-medium">
                  Полезные рецепты кажутся слишком сложными?
                </p>
              </div>
              <div className="bg-red-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Brain className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-gray-800 font-medium">
                  Запутались в том, как правильно питаться?
                </p>
              </div>
              <div className="bg-red-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <p className="text-gray-800 font-medium">
                  Надоело истязать себя ограничениями?
                </p>
              </div>
            </div>
            <button
              onClick={startQuiz}
              className="w-full sm:w-auto h-[56px] bg-green-500 text-white text-lg font-semibold px-8 rounded-full hover:bg-green-600 transition-colors inline-flex items-center justify-center group mx-auto"
            >
              Получить план питания
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">
            Что вы получите?
          </h2>
          
          <div className="space-y-24">
            {/* Персональный план питания */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[7/9] rounded-2xl overflow-hidden">
                <img
                  src="/f2.webp"
                  alt="Персональный план питания"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  Персональный план питания
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: <Target className="w-6 h-6 text-green-600" />, text: 'Персональный план под цели и образ жизни' },
                    { icon: <Heart className="w-6 h-6 text-green-600" />, text: 'Сбалансированный и вкусный рацион питания' },
                    { icon: <Brain className="w-6 h-6 text-green-600" />, text: 'Все нужные нутриенты в одном меню' },
                    { icon: <Sparkles className="w-6 h-6 text-green-600" />, text: 'Легко соблюдать без ограничений и без стресса' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <p className="text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={startQuiz}
                  className="w-full sm:w-auto h-[56px] bg-green-500 text-white text-lg font-semibold px-8 rounded-full hover:bg-green-600 transition-colors inline-flex items-center justify-center group"
                >
                  Получить план питания
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Список продуктов */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  Доступный список продуктов
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: <Calendar className="w-6 h-6 text-green-600" />, text: 'Списки под ваш рацион на неделю' },
                    { icon: <ShoppingCart className="w-6 h-6 text-green-600" />, text: 'Продукты из магазинов рядом с домом' },
                    { icon: <Target className="w-6 h-6 text-green-600" />, text: 'Доступные и недорогие ингредиенты' },
                    { icon: <Users className="w-6 h-6 text-green-600" />, text: 'Порции на себя или всю семью' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <p className="text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={startQuiz}
                  className="w-full sm:w-auto h-[56px] bg-green-500 text-white text-lg font-semibold px-8 rounded-full hover:bg-green-600 transition-colors inline-flex items-center justify-center group"
                >
                  Составить список продуктов
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="order-1 md:order-2 relative aspect-[7/9] rounded-2xl overflow-hidden">
                <img
                  src="/f1.webp"
                  alt="Список продуктов"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Рецепты */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-[7/9] rounded-2xl overflow-hidden">
                <img
                  src="/f3.webp"
                  alt="Пошаговые рецепты"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  Пошаговые рецепты с фотографиями
                </h3>
                <div className="space-y-6">
                  {[
                    { icon: <BookOpen className="w-6 h-6 text-green-600" />, text: 'Полный список нужных ингредиентов' },
                    { icon: <Brain className="w-6 h-6 text-green-600" />, text: 'Полезные советы и лайфхаки готовки' },
                    { icon: <Utensils className="w-6 h-6 text-green-600" />, text: 'Простые блюда без кулинарных навыков' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <p className="text-gray-700">{item.text}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={startQuiz}
                  className="w-full sm:w-auto h-[56px] bg-green-500 text-white text-lg font-semibold px-8 rounded-full hover:bg-green-600 transition-colors inline-flex items-center justify-center group"
                >
                  Получить рецепты
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Почему выбирают нас?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ИИ-технологии</h3>
              <p className="text-gray-600">Умный подбор рациона на&nbsp;основе ваших данных и&nbsp;целей</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Простые рецепты</h3>
              <p className="text-gray-600">Быстрые и&nbsp;вкусные блюда из&nbsp;доступных продуктов</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-gray-600">Консультации и&nbsp;ответы на&nbsp;вопросы в&nbsp;любое время</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы начать путь к&nbsp;здоровому питанию?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Получите персональный план питания прямо сейчас!
          </p>

          <button
            onClick={startQuiz}
            className="w-full sm:w-auto h-[56px] bg-white text-green-600 text-lg font-semibold px-8 rounded-full hover:bg-green-50 transition-colors inline-flex items-center justify-center mx-auto"
          >
            Создать мой план
            <ChevronRight className="ml-2 w-5 h-5 inline-block" />
          </button>
        </div>
      </section>
      
      {/* Video Modal */}
      {showVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={handleCloseVideo}
        >
          <div className="relative w-full max-w-4xl mx-4">
            <video
              className="w-full rounded-xl"
              controls
              autoPlay
              playsInline
              poster="/video-poster.jpg"
            >
              <source src="/presalediet.mp4" type="video/mp4" />
              <source src="/presalediet.webm" type="video/webm" />
              Ваш браузер не поддерживает видео
            </video>
          </div>
        </motion.div>
      )}
    </div>
  );
}