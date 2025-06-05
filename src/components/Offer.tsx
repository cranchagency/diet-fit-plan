import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { ChevronRight, UtensilsCrossed, ClipboardList, BookOpen, Clock, Replace, HeadphonesIcon, Users, Instagram, Send, Star, Timer, Utensils, LineChart, CheckCircle2, ArrowRight, MessageCircle, Heart, Sparkles, Play, Volume2, VolumeX } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

declare global {
  interface Window {
    cp: any;
  }
}

interface SuccessStory {
  image: string;
  name: string;
  weightLoss: string;
  title: string;
  description: string;
}

const successStories: SuccessStory[] = [
  {
    image: '/img1.webp',
    name: 'Анна Светлова',
    weightLoss: 'Похудела на 28 кг',
    title: '"Я смогла сбросить 28 кг за 6 месяцев!"',
    description: '"Раньше я перепробовала множество диет, но результат всегда был временным. С этим планом питания я не только похудела с 92 кг до 64 кг, но и научилась правильно питаться. Теперь я знаю, как поддерживать здоровый вес без жестких ограничений. Главное - это системный подход и правильно составленный рацион."'
  },
  {
    image: '/img2.webp',
    name: 'Мария Волкова',
    weightLoss: 'Похудела на 24 кг',
    title: '"За 5 месяцев я достигла своей цели!"',
    description: '"Я всегда думала, что похудеть можно только на жестких диетах. Но этот план питания полностью изменил мое мнение! С 86 кг я дошла до 62 кг, при этом питаясь вкусно и разнообразно. Самое главное - я научилась контролировать свой вес без стресса и ограничений."'
  },
  {
    image: '/img3.webp',
    name: 'Екатерина Соловьева',
    weightLoss: 'Похудела на 29 кг',
    title: '"Минус 29 кг за 7 месяцев - это реально!"',
    description: '"Когда я весила 88 кг, я не верила, что смогу похудеть без изнурительных тренировок и голодания. Этот план питания стал для меня настоящим открытием. Сейчас я вешу 59 кг и чувствую себя прекрасно. План научил меня правильно питаться и наслаждаться едой без чувства вины."'
  }
];

export default function Offer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [timeLeft, setTimeLeft] = useState(600); // 10 минут = 600 секунд
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showStickyTimer, setShowStickyTimer] = useState(false);
  const [consent, setConsent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const timerElement = document.getElementById('timer-section');
      if (timerElement) {
        const rect = timerElement.getBoundingClientRect();
        setShowStickyTimer(rect.top < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
    setUserName(answers[13] || '');
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const sendEmail = async (userEmail: string) => {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          userName: userName
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send email');
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (typeof window.cp === 'undefined') {
      setError('Пожалуйста, подождите, идет загрузка платежной системы...');
      setIsLoading(false);
      return;
    }

    try {
      const widget = new window.cp.CloudPayments();
      
      widget.pay('charge', {
        publicId: 'pk_8ce5202fa2f204a5797af616fab2b',
        description: 'Персональный план питания',
        amount: 89,
        currency: 'RUB',
        email: email,
        requireEmail: true,
        skin: "modern",
        data: {
          cloudPayments: {
            recurrent: {
              interval: 'Week',
              period: 1,
              amount: 899,
              currency: 'RUB',
              failAmount: 399
            }
          }
        }
      }, {
        onSuccess: async (options: any) => {
          console.log('Success:', options);
          try {
            await sendEmail(email);
          } catch (error) {
            console.error('Error sending email:', error);
          } finally {
            setIsLoading(false);
            navigate('/success');
          }
        },
        onFail: (reason: any, options: any) => {
          console.log('Fail:', reason, options);
          // If the main payment fails, try with the reduced amount
          if (reason.code === 5) { // Payment failed
            widget.pay('charge', {
              publicId: 'pk_8ce5202fa2f204a5797af616fab2b',
              description: 'Персональный план питания (альтернативный тариф)',
              amount: 89,
              currency: 'RUB',
              email: email,
              requireEmail: true,
              skin: "modern",
              data: {
                cloudPayments: {
                  recurrent: {
                    interval: 'Week',
                    period: 1,
                    amount: 399,
                    currency: 'RUB'
                  }
                }
              }
            });
          } else {
            setError('Произошла ошибка при оплате. Пожалуйста, попробуйте еще раз.');
          }
          setIsLoading(false);
        },
        onComplete: (paymentResult: any, options: any) => {
          console.log('Complete:', paymentResult, options);
          setIsLoading(false);
        }
      });
    } catch (err) {
      console.error('Payment error:', err);
      setError('Произошла ошибка при инициализации оплаты. Пожалуйста, попробуйте еще раз.');
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: <UtensilsCrossed className="w-6 h-6 text-green-500" />,
      title: 'Детальное меню на каждый день',
      description: 'Разнообразные блюда с учетом ваших предпочтений и целей'
    },
    {
      icon: <ClipboardList className="w-6 h-6 text-green-500" />,
      title: 'Список покупок с расчетом БЖУ',
      description: 'Готовый список продуктов с подсчетом белков, жиров и углеводов'
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-500" />,
      title: 'Простые рецепты с инструкциями',
      description: 'Пошаговые рецепты, которые легко приготовить дома'
    },
    {
      icon: <Clock className="w-6 h-6 text-green-500" />,
      title: 'Советы по подготовке и хранению',
      description: 'Рекомендации по prep meal и хранению продуктов'
    },
    {
      icon: <Replace className="w-6 h-6 text-green-500" />,
      title: 'Альтернативные варианты блюд',
      description: 'Замены ингредиентов для разнообразия рациона'
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-green-500" />,
      title: 'Поддержка и консультации',
      description: 'Ответы на вопросы и помощь в адаптации плана питания'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Sticky Timer Banner */}
      <div className={`fixed top-0 left-0 right-0 bg-white shadow-md transform transition-transform duration-300 z-50 ${
        showStickyTimer ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-center">
          <span className="text-gray-600">Предложение ограничено:</span>
          <span className="font-bold text-green-500 ml-2">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Hero Section с градиентом */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 py-16">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl font-bold mb-2">
                {userName ? `${userName}, специальное предложение для вас! Скидка 90% только сейчас` : 'Специальное предложение для вас! Скидка 90% только сейчас'}
              </h1>
              
              {/* Таймер */}
              <div id="timer-section" className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <p className="text-sm font-medium mb-1">
                  Предложение ограничено:
                </p>
                <div className="text-2xl font-bold tabular-nums">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Section */}
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center sm:text-left">
                Подробнее о вашем плане питания
              </h2>
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  const video = document.querySelector('video');
                  if (video) {
                    video.muted = !isMuted;
                  }
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors w-full sm:w-auto"
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-600">Включить звук</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-600">Звук включен</span>
                  </>
                )}
              </button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <video
                className="w-full cursor-pointer"
                controls
                autoPlay
                playsInline
                loop
                muted={isMuted}
                controlsList="nodownload"
                poster="/video-poster.jpg"
              >
                <source src="/salediet.mp4" type="video/mp4" />
                <source src="/salediet.webm" type="video/webm" />
                Ваш браузер не поддерживает видео
              </video>
            </div>
          </div>

          <div className="p-8">
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-green-50"
                >
                  <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {userName ? `${userName}, введите ваш email для получения плана` : 'Ваш email для получения плана'}
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="example@email.com"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="mb-6">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 rounded text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-600">
                    Даю согласие на обработку персональных данных, а также ознакомлен с публичной офертой
                  </span>
                </label>
              </div>

              <div className="text-center mb-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500 font-bold text-2xl">89 ₽</span>
                    <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full">-90%</span>
                    <span className="text-gray-400 line-through text-lg">899 ₽</span>
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || !consent}
                    className={`w-full bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                      (isLoading || !consent) ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? 'Загрузка...' : 'Оплатить'}
                    {!isLoading && <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        {/* История успеха */}
        <div className="mt-8">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="rounded-2xl shadow-lg overflow-hidden"
          >
            {successStories.map((story, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white"
                >
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/2">
                        <img
                          src={story.image}
                          alt={`История успеха - ${story.name}`}
                          className="rounded-xl shadow-lg"
                        />
                      </div>
                      <div className="md:w-1/2">
                        <div className="bg-green-50 rounded-lg px-4 py-2 text-green-600 font-medium inline-block mb-4">
                          История успеха
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {story.title}
                        </h3>
                        <p className="text-gray-600 mb-6">
                          {story.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-semibold text-gray-900">{story.name}</p>
                            <p className="text-sm text-gray-500">{story.weightLoss}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-[10px] text-gray-400 text-center max-w-3xl mx-auto leading-tight">
            Предлагаемые планы питания создаются индивидуально для поддержания здорового образа жизни, но не являются лечебным питанием или медицинским продуктом. Автоматически сформированные планы могут учитывать общие параметры, но не всегда способны учесть все индивидуальные особенности организма. Перед использованием рекомендуется проконсультироваться с врачом, особенно при наличии заболеваний или ограничений.
          </p>
        </div>
      </div>
    </div>
  );
}