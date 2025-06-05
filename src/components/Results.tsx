import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Target, ChevronRight, Activity, Timer, GlassWater, Calendar, ArrowRight } from 'lucide-react';

interface Metrics {
  bmr: number;
  bmi: number;
  targetCalories: number;
  proteinIntake: number;
  fatIntake: number;
  carbIntake: number;
  waterIntake: number;
  mealsPerDay: number;
  userName: string;
  currentWeight: number;
  targetWeight: number;
}

export default function Results() {
  const navigate = useNavigate();
  const [showMobileButton, setShowMobileButton] = useState(false);
  const [metrics, setMetrics] = useState<Metrics>({
    bmr: 0,
    bmi: 0,
    targetCalories: 0,
    proteinIntake: 0,
    fatIntake: 0,
    carbIntake: 0,
    waterIntake: 0,
    mealsPerDay: 0,
    userName: '',
    currentWeight: 0,
    targetWeight: 0
  });

  const calculateWeeksToGoal = () => {
    const weightDiff = Math.abs(metrics.currentWeight - metrics.targetWeight);
    return Math.ceil(weightDiff / 2);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowMobileButton(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const answers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
    
    const gender = answers[1] === 'Мужской' ? 'male' : 'female';
    const age = parseInt(answers[14]);
    const weight = parseInt(answers[15]);
    const targetWeight = parseInt(answers[16]);
    const height = parseInt(answers[17]);
    const activityLevel = answers[2];
    const goal = answers[3];
    const userName = answers[13] || '';

    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    let activityMultiplier = 1.2;
    switch (activityLevel) {
      case 'Я иногда хожу на легкие прогулки':
        activityMultiplier = 1.375;
        break;
      case 'Я регулярно тренируюсь':
        activityMultiplier = 1.55;
        break;
      case 'У меня очень активный образ жизни':
        activityMultiplier = 1.725;
        break;
    }

    let tdee = bmr * activityMultiplier;
    let targetCalories = tdee;

    switch (goal) {
      case 'Похудеть':
        targetCalories = tdee - 500;
        break;
      case 'Набрать мышечную массу':
        targetCalories = tdee + 300;
        break;
    }

    const proteinIntake = weight * 2;
    const fatIntake = (targetCalories * 0.25) / 9;
    const carbIntake = (targetCalories - (proteinIntake * 4 + fatIntake * 9)) / 4;
    const waterIntake = weight * 30;
    const bmi = weight / ((height / 100) * (height / 100));

    setMetrics({
      bmr: Math.round(bmr),
      bmi: parseFloat(bmi.toFixed(1)),
      targetCalories: Math.round(targetCalories),
      proteinIntake: Math.round(proteinIntake),
      fatIntake: Math.round(fatIntake),
      carbIntake: Math.round(carbIntake),
      waterIntake: Math.round(waterIntake),
      mealsPerDay: 3,
      userName,
      currentWeight: weight,
      targetWeight: targetWeight
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 pb-24 md:pb-0"
        >
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {metrics.userName ? `${metrics.userName}, ваш персональный план готов! 🎉` : 'Ваш персональный план готов! 🎉'}
            </h1>
            <p className="text-lg text-gray-600">
              Мы рассчитали оптимальные показатели для достижения вашей цели
            </p>
          </div>

          {/* Weight Progress Card */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center gap-6 w-full max-w-2xl mb-8">
                <div className="text-center p-6 bg-gray-50 rounded-xl flex-1">
                  <div className="text-sm text-gray-600 mb-2">Текущий вес</div>
                  <div className="text-3xl font-bold text-gray-900">{metrics.currentWeight} кг</div>
                </div>
                
                <div className="flex items-center">
                  <ArrowRight className="w-8 h-8 text-green-500" />
                </div>

                <div className="text-center p-6 bg-green-50 rounded-xl flex-1">
                  <div className="text-sm text-gray-600 mb-2">Желаемый вес</div>
                  <div className="text-3xl font-bold text-green-600">{metrics.targetWeight} кг</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-green-500" />
                <span className="font-medium">
                  Расчетный срок достижения цели: {calculateWeeksToGoal()} недель
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Metrics */}
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-500" />
                  Основные показатели
                </h3>
                <div className="grid gap-4">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Scale className="w-5 h-5 text-green-600" />
                        <span className="font-medium">ИМТ</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">{metrics.bmi}</span>
                    </div>
                    <p className="text-sm text-green-700">Оптимальный показатель: 18.5 - 24.9</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-orange-600" />
                        <span className="font-medium">Калории</span>
                      </div>
                      <span className="text-xl font-bold text-orange-600">{metrics.targetCalories}</span>
                    </div>
                    <p className="text-sm text-orange-700">Ваша суточная норма калорий</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <Timer className="w-5 h-5 text-purple-600" />
                        <span className="text-xl font-bold text-purple-600">3</span>
                      </div>
                      <p className="text-sm text-purple-700">Приемов пищи</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <GlassWater className="w-5 h-5 text-blue-600" />
                        <span className="text-xl font-bold text-blue-600">{(metrics.waterIntake / 1000).toFixed(1)}л</span>
                      </div>
                      <p className="text-sm text-blue-700">Воды в день</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Macronutrients */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Распределение БЖУ
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Белки</span>
                      <span className="font-bold text-green-600">{metrics.proteinIntake}г</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '33%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Жиры</span>
                      <span className="font-bold text-yellow-600">{metrics.fatIntake}г</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">Углеводы</span>
                      <span className="font-bold text-red-600">{metrics.carbIntake}г</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - CTA */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 flex flex-col">
              <div className="flex-grow">
                <div className="h-48 mb-6 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                    alt="Здоровое питание"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Попробуйте ваш персональный план питания
                </h3>
                <p className="text-gray-600 mb-8">
                  Мы подготовили для вас план питания, который поможет достичь ваших целей
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Персональный рацион питания',
                    'Список продуктов с расчетом БЖУ',
                    'Простые рецепты с инструкциями',
                    'Советы по приготовлению',
                    'Альтернативные варианты блюд',
                    'ИИ консультант и поддержка'
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate('/offer')}
                className="hidden md:flex w-full bg-green-500 text-white text-lg font-semibold px-6 py-4 rounded-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 pulse-button items-center justify-center group"
              >
                Забрать план
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fixed Mobile Button */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 mobile-fixed-button ${showMobileButton ? 'visible' : ''}`}>
        <button
          onClick={() => navigate('/offer')}
          className="w-full bg-green-500 text-white text-lg font-semibold px-6 py-4 rounded-xl pulse-button flex items-center justify-center"
        >
          Забрать план
          <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}