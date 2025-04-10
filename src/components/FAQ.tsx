import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HelpCircle, ChevronRight, Home, Brain, Scale, Timer, Utensils, Heart, Target, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    icon: <Brain className="w-6 h-6 text-green-500" />,
    question: 'На основе чего будет строиться мой план питания?',
    answer: 'Ваш план питания создается с помощью искусственного интеллекта на основе ваших индивидуальных параметров: возраста, веса, роста, уровня активности, пищевых предпочтений и целей. Мы учитываем ваш образ жизни, количество приемов пищи и даже продукты, которые вы хотите исключить. Это позволяет создать максимально персонализированный план, который будет комфортным и эффективным именно для вас.'
  },
  {
    icon: <Scale className="w-6 h-6 text-green-500" />,
    question: 'Нужно ли мне заниматься спортом, чтобы получить результат?',
    answer: 'Это необязательно! Исследования показали, что для похудения достаточно правильно подобранного рациона питания. Но вести активный образ жизни полезно не только для здорового организма, но и для внутренней энергии, поэтому хотя бы чаще гулять очень рекомендуем.'
  },
  {
    icon: <Timer className="w-6 h-6 text-green-500" />,
    question: 'Сколько времени нужно, чтобы увидеть первые результаты?',
    answer: 'Первые результаты большинство людей замечают уже через 1-2 недели следования плану. Это может быть не только снижение веса, но и улучшение самочувствия, повышение энергии и нормализация пищевых привычек. Устойчивые результаты формируются через 2-3 месяца регулярного следования рекомендациям.'
  },
  {
    icon: <Utensils className="w-6 h-6 text-green-500" />,
    question: 'Придется ли мне есть невкусную пищу или сильно ограничивать себя?',
    answer: 'Нет! Наш план питания основан на принципе разумного баланса, а не жестких ограничений. Мы подбираем вкусные и разнообразные блюда с учетом ваших предпочтений. Вы сможете есть привычные продукты, просто в правильных пропорциях и сочетаниях. План включает даже альтернативные варианты блюд, чтобы вы могли разнообразить свой рацион.'
  },
  {
    icon: <Heart className="w-6 h-6 text-green-500" />,
    question: 'Безопасно ли следовать этому плану питания?',
    answer: 'Да, наш план питания абсолютно безопасен, так как основан на принципах здорового питания и не включает экстремальных ограничений или небезопасных методик. Мы рассчитываем оптимальную калорийность и соотношение питательных веществ для вашего организма. Однако, если у вас есть хронические заболевания или особые состояния здоровья, рекомендуем проконсультироваться с врачом перед началом любых изменений в питании.'
  },
  {
    icon: <Target className="w-6 h-6 text-green-500" />,
    question: 'Что делать, если я не достигаю желаемых результатов?',
    answer: 'Каждый организм уникален и может по-разному реагировать на изменения в питании. Если вы не видите ожидаемых результатов, наша служба поддержки поможет скорректировать план с учетом ваших индивидуальных особенностей. Мы проанализируем ваш текущий рацион, образ жизни и поможем найти оптимальное решение для достижения ваших целей.'
  }
];

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-green-500 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            Главная
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Вопрос-Ответ</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Часто задаваемые вопросы
              </h1>
              <p className="text-lg text-gray-600">
                Ответы на популярные вопросы о нашем плане питания
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-50 rounded-lg">
                        {faq.icon}
                      </div>
                      <span className="font-medium text-gray-900">{faq.question}</span>
                    </div>
                    {openFAQ === index ? (
                      <Minus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 pl-14">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}