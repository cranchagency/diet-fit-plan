import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, ChevronRight, Home, HelpCircle, Plus, Minus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Я не получил план питания после оплаты, что делать?',
    answer: 'План питания отправляется автоматически на указанный email в течение нескольких минут после оплаты. Проверьте папку "Спам". Если письмо не пришло в течение 15 минут, напишите нам на почту support@dietfit-plan.ru, мы оперативно решим проблему.'
  },
  {
    question: 'Почему с моей карты списываются деньги?',
    answer: 'При оформлении заказа вы соглашаетесь с условиями рекуррентных платежей, описанными в разделе "Тарифы". Это позволяет автоматически продлевать доступ к обновлениям плана питания. Вы можете отключить автопродление в любой момент, написав в поддержку.'
  },
  {
    question: 'Как получить возврат средств?',
    answer: 'Для возврата средств напишите нам на почту support@dietfit-plan.ru с указанием даты оплаты и email, использованного при покупке. Обработка запроса занимает до 3 рабочих дней.'
  },
  {
    question: 'Что делать, если я не могу открыть файл с планом питания?',
    answer: 'План питания отправляется в формате PDF. Убедитесь, что на вашем устройстве установлено приложение для чтения PDF файлов. Если проблема сохраняется, напишите нам, и мы отправим файл в альтернативном формате.'
  },
  {
    question: 'Как долго действует доступ к плану питания?',
    answer: 'Базовый доступ к плану питания предоставляется на 7 дней. После этого происходит автоматическое продление подписки согласно выбранному тарифу. Вы можете отменить подписку в любой момент.'
  },
  {
    question: 'Можно ли изменить email для получения плана?',
    answer: 'Да, напишите нам на почту support@dietfit-plan.ru с указанием текущего и нового email адреса. Мы внесем изменения и повторно отправим план питания.'
  },
  {
    question: 'Что входит в план питания?',
    answer: 'План питания включает персональный расчет калорий, меню на неделю с учетом ваших предпочтений, список покупок, рецепты и рекомендации по приготовлению. Также вы получаете доступ к обновлениям и поддержке.'
  },
  {
    question: 'Как отменить подписку?',
    answer: 'Для отмены подписки напишите нам на почту support@dietfit-plan.ru. Мы поможем отключить автоматическое продление в течение 24 часов.'
  }
];

export default function Support() {
  const navigate = useNavigate();
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
          <span className="text-gray-900">Техническая поддержка</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-8 md:p-12">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Техническая поддержка
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Столкнулись с проблемами? Напишите нам! Мы вам ответим в течение 24 часов.
              </p>
            </div>

            <div className="max-w-lg mx-auto bg-green-50 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <Clock className="w-6 h-6 text-green-500" />
                <span className="font-medium text-gray-900">Время ответа: до 24 часов</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-green-500" />
                <a 
                  href="mailto:support@dietfit-plan.ru"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  support@dietfit-plan.ru
                </a>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-green-500" />
                Часто задаваемые вопросы
              </h2>
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
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {openFAQ === index ? (
                        <Minus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/quiz')}
                className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors font-medium group"
              >
                Создать план питания
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}