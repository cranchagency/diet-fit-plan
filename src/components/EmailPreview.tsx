import React from 'react';
import { Mail } from 'lucide-react';

export default function EmailPreview() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <Mail className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Предпросмотр письма</h1>
          <p className="text-gray-600 mt-2">HTML-версия письма, которое получают пользователи</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="border rounded-lg p-8">
              <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ color: '#22c55e' }}>Здравствуйте, Иван!</h2>
                <p>Спасибо за заказ персонального плана питания.</p>
                <p>Во вложении вы найдете ваш индивидуальный план.</p>
                <p style={{ marginTop: '24px' }}>
                  С уважением,<br />
                  Команда FoodPlan
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Информация о письме:</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <p><strong>От:</strong> FoodPlan &lt;no-reply@foodplan.ru&gt;</p>
                <p><strong>Тема:</strong> Ваш персональный план питания</p>
                <p><strong>Вложения:</strong> food-plan.pdf</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}