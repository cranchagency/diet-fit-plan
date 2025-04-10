import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import {
  ChevronRight,
  Scale,
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
  Play
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
      <section className="relative bg-gradient-to-br from-white to-green-50">
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
                  Пройдите анкету, и наш искусственный интеллект рассчитает вашу норму калорий и составит план питания персонально для вас.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <button
                    onClick={startQuiz}
                    className="w-full sm:w-auto bg-green-500 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center group"
                  >
                    Начать сейчас
                    <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={handleVideoClick}
                    className="w-full sm:w-auto bg-white text-green-600 text-lg font-semibold px-8 py-4 rounded-full hover:bg-green-50 border-2 border-green-500 transition-all duration-300 inline-flex items-center justify-center group"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Смотреть промо
                  </button>
                </div>

                {/* Stats */}
                <div className="mt-12 grid grid-cols-3 gap-4 bg-transparent">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">1000+</div>
                    <div className="text-sm text-gray-600">Довольных клиентов</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">86%</div>
                    <div className="text-sm text-gray-600">Достигают цели</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-2xl font-bold text-green-600">10K+</div>
                    <div className="text-sm text-gray-600">Рецептов</div>
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

        {/* Info Banner */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full lg:translate-y-0">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-t-2xl p-4">
              <div className="flex items-center justify-center gap-2">
                <Brain className="w-5 h-5 text-green-500" />
                <p className="text-gray-700 font-medium">
                  Все рецепты разработаны профессиональными нутрициологами
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-16 px-4 bg-white mt-16 lg:mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Устали от диет, которые не работают?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-left text-gray-600">Вес застыл на месте, и ничего не помогает?</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-left text-gray-600">Полезные рецепты кажутся слишком сложными?</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-left text-gray-600">Запутались в том, как правильно питаться?</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-2 rounded-full">
                    <CheckCircle2 className="w-6 h-6 text-red-500" />
                  </div>
                  <p className="text-left text-gray-600">Надоело истязать себя ограничениями?</p>
                </div>
              </div>
              <div>
                <img 
                  src="/food2.webp"
                  alt="Здоровая еда"
                  className="rounded-2xl shadow-lg"
                />
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={startQuiz}
                className="bg-green-500 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center mx-auto"
              >
                Получить план питания
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
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
              <p className="text-gray-600">Умный подбор рациона на основе ваших данных и целей</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Utensils className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Простые рецепты</h3>
              <p className="text-gray-600">Быстрые и вкусные блюда из доступных продуктов</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-gray-600">Консультации и ответы на вопросы в любое время</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-500 to-green-600 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы начать путь к здоровому питанию?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Получите персональный план питания прямо сейчас!
          </p>

          <button
            onClick={startQuiz}
            className="bg-white text-green-600 text-lg font-semibold px-8 py-4 rounded-full hover:bg-green-50 transition-colors"
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