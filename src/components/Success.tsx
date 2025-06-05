import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Оплата прошла успешно!
        </h1>

        <p className="text-gray-600 mb-8">
          Спасибо за ваш заказ. Мы отправили персональный план питания на указанный email.
        </p>

        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-blue-500 mr-2" />
            <span className="text-blue-700 font-medium">Проверьте вашу почту</span>
          </div>
          <p className="text-blue-600 text-sm">
            Письмо может прийти в течение нескольких минут. Не забудьте проверить папку "Спам".
          </p>
        </div>

        <div className="bg-amber-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-amber-500 mr-2" />
            <span className="text-amber-700 font-medium">Не получили письмо?</span>
          </div>
          <p className="text-amber-600 text-sm">
            Если письмо не пришло в течение 15 минут, пожалуйста, напишите нам на support@dietfit-plan.ru
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center text-green-500 hover:text-green-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-4 mr-2" />
          Вернуться на главную
        </Link>
      </motion.div>
    </div>
  );
}