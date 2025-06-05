import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, HelpCircle, Brain, Scale, Target, User, UserCircle2, Armchair, Scaling as Walking, Dumbbell, FileWarning as Running, HeartPulse, Beef, Trophy, Coffee, GlassWater, Sandwich, Salad, Fish, Wheat, Apple, Soup, Timer, Home, Rocket, Sparkles, Cookie, Clock, Salad as Salt, Leaf, Heart, Flame, Utensils, Drumstick, Carrot, Banana, Cherry, Milk, Pizza, BookDown as Bowl } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  hint?: string;
  type: 'single' | 'multiple' | 'text' | 'number' | 'final';
  options?: Array<{
    text: string;
    icon: React.ReactNode;
  }>;
  validation?: {
    min?: number;
    max?: number;
    required?: boolean;
  };
  placeholder?: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Укажите свой пол',
    type: 'single',
    options: [
      { text: 'Мужской', icon: <User className="w-5 h-5" /> },
      { text: 'Женский', icon: <UserCircle2 className="w-5 h-5" /> }
    ]
  },
  {
    id: 2,
    text: 'Как часто вы двигаетесь в течение дня?',
    hint: 'Это поможет рассчитать вашу суточную норму калорий',
    type: 'single',
    options: [
      { text: 'У меня сидячая работа', icon: <Armchair className="w-5 h-5" /> },
      { text: 'Я иногда хожу на легкие прогулки', icon: <Walking className="w-5 h-5" /> },
      { text: 'Я регулярно тренируюсь', icon: <Dumbbell className="w-5 h-5" /> },
      { text: 'У меня очень активный образ жизни', icon: <Running className="w-5 h-5" /> }
    ]
  },
  {
    id: 3,
    text: 'Какая у вас цель?',
    hint: 'От этого зависит состав вашего рациона',
    type: 'single',
    options: [
      { text: 'Похудеть', icon: <Scale className="w-5 h-5" /> },
      { text: 'Набрать мышечную массу', icon: <Dumbbell className="w-5 h-5" /> },
      { text: 'Поддерживать форму', icon: <Target className="w-5 h-5" /> }
    ]
  },
  {
    id: 4,
    text: 'Сколько раз в день вы едите?',
    type: 'single',
    options: [
      { text: '1', icon: <Bowl className="w-5 h-5" /> },
      { text: '2', icon: <Bowl className="w-5 h-5" /> },
      { text: '3', icon: <Utensils className="w-5 h-5" /> },
      { text: '4', icon: <Pizza className="w-5 h-5" /> },
      { text: '5', icon: <Sandwich className="w-5 h-5" /> }
    ]
  },
  {
    id: 5,
    text: 'Сколько воды вы обычно выпиваете в течение дня?',
    type: 'single',
    options: [
      { text: 'Только кофе и чай', icon: <Coffee className="w-5 h-5" /> },
      { text: 'Меньше 1 литра', icon: <GlassWater className="w-5 h-5" /> },
      { text: '1-2 литра', icon: <Milk className="w-5 h-5" /> },
      { text: '2-3 литра', icon: <Bowl className="w-5 h-5" /> },
      { text: 'Больше 3 литров', icon: <Timer className="w-5 h-5" /> }
    ]
  },
  {
    id: 6,
    text: 'Какое мясо вы предпочитаете в своем рационе?',
    hint: 'Выберите один вариант, это повлияет на состав вашего рациона',
    type: 'single',
    options: [
      { text: 'Говядина', icon: <Beef className="w-5 h-5" /> },
      { text: 'Курица', icon: <Drumstick className="w-5 h-5" /> },
      { text: 'Индейка', icon: <Bowl className="w-5 h-5" /> },
      { text: 'Рыба', icon: <Fish className="w-5 h-5" /> },
      { text: 'Морепродукты', icon: <Utensils className="w-5 h-5" /> },
      { text: 'Без мяса', icon: <Leaf className="w-5 h-5" /> },
      { text: 'Все', icon: <Sparkles className="w-5 h-5" /> }
    ]
  },
  {
    id: 7,
    text: 'Как насчет овощей?',
    type: 'single',
    options: [
      { text: 'Ем регулярно', icon: <Carrot className="w-5 h-5" /> },
      { text: 'Иногда добавляю в рацион', icon: <Salad className="w-5 h-5" /> }
    ]
  },
  {
    id: 8,
    text: 'Какие продукты вы хотите исключить?',
    hint: 'Выберите один вариант, это повлияет на состав вашего рациона',
    type: 'single',
    options: [
      { text: 'Лактоза', icon: <Milk className="w-5 h-5" /> },
      { text: 'Глютен', icon: <Wheat className="w-5 h-5" /> },
      { text: 'Орехи', icon: <Apple className="w-5 h-5" /> },
      { text: 'Ягоды', icon: <Cherry className="w-5 h-5" /> },
      { text: 'Соя', icon: <Leaf className="w-5 h-5" /> },
      { text: 'Ничего, оставить всё', icon: <Sparkles className="w-5 h-5" /> }
    ]
  },
  {
    id: 9,
    text: 'Какие рецепты вы предпочитаете?',
    type: 'single',
    options: [
      { text: 'Для всей семьи', icon: <Home className="w-5 h-5" /> },
      { text: 'Быстрые', icon: <Timer className="w-5 h-5" /> },
      { text: 'Простые', icon: <Utensils className="w-5 h-5" /> },
      { text: 'Можно готовить заранее', icon: <Clock className="w-5 h-5" /> }
    ]
  },
  {
    id: 10,
    text: 'Какой уровень сложности рациона вам подходит?',
    type: 'single',
    options: [
      { text: 'Ем простое (подходит под любой бюджет)', icon: <Bowl className="w-5 h-5" /> },
      { text: 'Ем разнообразную пищу', icon: <Utensils className="w-5 h-5" /> }
    ]
  },
  {
    id: 11,
    text: 'Есть ли у вас вредные привычки?',
    hint: 'Можно выбрать несколько вариантов',
    type: 'multiple',
    options: [
      { text: 'Ем много сладкого', icon: <Cookie className="w-5 h-5" /> },
      { text: 'Пропускаю приемы пищи', icon: <Timer className="w-5 h-5" /> },
      { text: 'Поздно ужинаю', icon: <Clock className="w-5 h-5" /> },
      { text: 'Ем много соленого', icon: <Salt className="w-5 h-5" /> },
      { text: 'Нет привычек', icon: <Sparkles className="w-5 h-5" /> }
    ]
  },
  {
    id: 12,
    text: 'Выберите дополнительные цели',
    hint: 'Можно выбрать несколько вариантов',
    type: 'multiple',
    options: [
      { text: 'Сформировать полезную привычку', icon: <Heart className="w-5 h-5" /> },
      { text: 'Улучшить здоровье', icon: <HeartPulse className="w-5 h-5" /> },
      { text: 'Оптимизировать питание под тренировки', icon: <Dumbbell className="w-5 h-5" /> }
    ]
  },
  {
    id: 13,
    text: 'Как к вам обращаться?',
    type: 'text',
    validation: {
      required: true
    },
    placeholder: 'Введите своё имя'
  },
  {
    id: 14,
    text: 'Укажите ваш возраст, чтобы мы подобрали оптимальный рацион',
    type: 'number',
    validation: {
      required: true,
      min: 18,
      max: 100
    },
    placeholder: 'Введите свой возраст'
  },
  {
    id: 15,
    text: 'Укажите ваш текущий вес',
    hint: 'Это поможет нам рассчитать оптимальную калорийность рациона',
    type: 'number',
    validation: {
      required: true,
      min: 40,
      max: 200
    },
    placeholder: 'Введите свой текущий вес'
  },
  {
    id: 16,
    text: 'Укажите ваш желаемый вес',
    hint: 'Это поможет нам составить план для достижения вашей цели',
    type: 'number',
    validation: {
      required: true,
      min: 40,
      max: 200
    },
    placeholder: 'Введите свой желаемый вес'
  },
  {
    id: 17,
    text: 'Укажите ваш рост в сантиметрах',
    hint: 'Это поможет нам точнее рассчитать ваш индекс массы тела (ИМТ)',
    type: 'number',
    validation: {
      required: true,
      min: 140,
      max: 220
    },
    placeholder: 'Введите ваш рост'
  },
  {
    id: 19,
    text: 'Все готово для создания вашего персонального плана питания',
    type: 'final'
  }
];

export default function Quiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [error, setError] = useState<string>('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion]);

  const calculateProgress = () => {
    return Math.round(((currentQuestion + 1) / (questions.length - 1)) * 100);
  };

  const handleSingleChoice = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setInputValue('');
    }
  };

  const handleMultipleChoice = (option: string) => {
    const currentAnswers = answers[questions[currentQuestion].id] || [];
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((a: string) => a !== option)
      : [...currentAnswers, option];
    setAnswers({ ...answers, [questions[currentQuestion].id]: newAnswers });
  };

  const handleTextInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input') as HTMLInputElement;
    const value = input.value.trim();

    if (!value && questions[currentQuestion].validation?.required) {
      setError('Это поле обязательно для заполнения');
      return;
    }

    if (questions[currentQuestion].type === 'number') {
      const numValue = Number(value);
      const { min, max } = questions[currentQuestion].validation || {};

      if (min && numValue < min) {
        setError(`Минимальное значение: ${min}`);
        return;
      }
      if (max && numValue > max) {
        setError(`Максимальное значение: ${max}`);
        return;
      }
    }

    setError('');
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setInputValue('');
    }
  };

  const handleNext = () => {
    const currentAnswers = answers[questions[currentQuestion].id];
    if (questions[currentQuestion].type === 'multiple' && (!currentAnswers || currentAnswers.length === 0)) {
      setError('Выберите хотя бы один вариант');
      return;
    }
    setError('');
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setInputValue('');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setError('');
      setInputValue('');
    } else {
      navigate('/');
    }
  };

  const handleSubmit = () => {
    const isComplete = questions
      .filter(q => q.type !== 'final')
      .every((question) => answers[question.id] !== undefined);
    
    if (!isComplete) {
      setError('Пожалуйста, ответьте на все вопросы');
      return;
    }
    
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    navigate('/loading');
  };

  const question = questions[currentQuestion];

  if (question.type === 'final') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <Brain className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Отлично! Все данные собраны
            </h2>
            <p className="text-gray-600 mb-8">
              Мы готовы создать ваш персональный план питания с помощью ИИ,<br />
              учитывая все ваши предпочтения и цели
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-xl">
                <Scale className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Текущий вес</p>
                <p className="text-xl font-bold text-gray-900">{answers[15]} кг</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Целевой вес</p>
                <p className="text-xl font-bold text-gray-900">{answers[16]} кг</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto"
            >
              Создать план питания
              <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-start justify-start p-4 sm:items-center sm:justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mt-0 sm:mt-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">
              Вопрос {currentQuestion + 1} из {questions.length - 1}
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full progress-bar-shimmer rounded-full"
                  style={{ width: `${((currentQuestion + 1) / (questions.length - 1)) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-green-500">
                {calculateProgress()}%
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <h2 className="text-2xl font-bold text-gray-900">{question.text}</h2>
            {question.hint && (
              <div className="group relative">
                <HelpCircle className="w-5 h-5 text-gray-400 cursor-help" />
                <div className="absolute left-0 top-6 w-64 p-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {question.hint}
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {question.type === 'single' && question.options && (
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSingleChoice(option.text)}
                  className={`w-full text-left p-4 rounded-xl border-2 hover:border-green-500 hover:bg-green-50 transition-all duration-300 flex justify-between items-center group
                    ${answers[questions[currentQuestion].id] === option.text ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-green-500">
                      {option.icon}
                    </div>
                    <span>{option.text}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500 transform group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {question.type === 'multiple' && question.options && (
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleMultipleChoice(option.text)}
                  className={`w-full text-left p-4 rounded-xl border-2 hover:border-green-500 hover:bg-green-50 transition-all duration-300 flex items-center gap-3
                    ${(answers[questions[currentQuestion].id] || []).includes(option.text) ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
                >
                  <div className="text-green-500">
                    {option.icon}
                  </div>
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          )}

          {(question.type === 'text' || question.type === 'number') && (
            <form onSubmit={handleTextInput} className="space-y-4">
              <input
                type={question.type}
                placeholder={question.placeholder}
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-300"
                min={question.validation?.min}
                max={question.validation?.max}
                required={question.validation?.required}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="w-full p-4 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-all duration-300 flex items-center justify-center group"
              >
                Далее
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Назад
          </button>

          {question.type === 'multiple' && (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 text-white bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full transition-colors"
            >
              Далее
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}