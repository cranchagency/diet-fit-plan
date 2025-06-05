import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { isEmail } from './src/utils/validation.js';
import { logger } from './src/utils/logger.js';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.yandex.ru',
  port: 587,
  secure: false,
  auth: {
    user: 'your@dietfit-plan.ru',
    pass: 'qogzmhdnvouytljp'
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));

const CLOUDPAYMENTS_API_URL = 'https://api.cloudpayments.ru';

const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  try {
    await transporter.sendMail({
      from: '"FoodPlan" <your@dietfit-plan.ru>',
      to,
      subject,
      text,
      html
    });
    logger.info('Email sent successfully', { to, subject });
  } catch (error) {
    logger.error('Error sending email', { error: error instanceof Error ? error.message : 'Unknown error' });
    throw error;
  }
};

const createCloudPaymentsSubscription = async (token: string, accountId: string) => {
  try {
    const startDate = new Date();
    startDate.setHours(startDate.getHours() + 24);

    const response = await axios.post(
      `${CLOUDPAYMENTS_API_URL}/subscriptions/create`,
      {
        token,
        accountId,
        amount: 899,
        currency: 'RUB',
        interval: 'Week',
        period: 1,
        startDate: startDate.toISOString(),
        description: 'Подписка на план питания'
      },
      {
        auth: {
          username: process.env.CLOUDPAYMENTS_PUBLIC_ID!,
          password: process.env.CLOUDPAYMENTS_API_SECRET!
        }
      }
    );

    if (response.data.Success) {
      return response.data;
    }
    throw new Error(response.data.Message);
  } catch (error) {
    logger.error('Error creating subscription', { error: error instanceof Error ? error.message : 'Unknown error' });
    throw error;
  }
};

const disableCloudPaymentsSubscription = async (subscriptionId: string) => {
  try {
    const response = await axios.post(
      `${CLOUDPAYMENTS_API_URL}/subscriptions/disable`,
      { id: subscriptionId },
      {
        auth: {
          username: process.env.CLOUDPAYMENTS_PUBLIC_ID!,
          password: process.env.CLOUDPAYMENTS_API_SECRET!
        }
      }
    );

    if (response.data.Success) {
      return response.data;
    }
    throw new Error(response.data.Message);
  } catch (error) {
    logger.error('Error disabling subscription', { error: error instanceof Error ? error.message : 'Unknown error' });
    throw error;
  }
};

// Initial payment webhook
app.post('/api/payment-success', async (req, res) => {
  try {
    logger.info('Received payment success webhook', { body: req.body });
    
    // Парсим данные из формы
    const {
      TransactionId,
      Status,
      CardFirstSix,
      CardLastFour,
      CardType,
      Email,
      AccountId,
      TestMode,
      Data
    } = req.body;

    // Проверяем статус
    if (Status !== 'Completed') {
      logger.info('Payment not completed', { status: Status });
      return res.json({ success: false, message: 'Payment not completed' });
    }

    // Парсим дополнительные данные
    let subscriptionData;
    try {
      subscriptionData = typeof Data === 'string' ? JSON.parse(Data) : Data;
    } catch (error) {
      logger.error('Error parsing Data field', { error });
      subscriptionData = Data;
    }

    // Сохраняем информацию о подписке в базу
    const { error: dbError } = await supabase
      .from('subscriptions')
      .insert({
        email: Email,
        accountid: AccountId || TransactionId, // Используем TransactionId как запасной вариант
        token: `${CardType}:${CardFirstSix}:${CardLastFour}`, // Сохраняем информацию о карте
        currentweek: 1,
        subscriptionactive: true,
        test_mode: TestMode === '1' // Сохраняем информацию о тестовом режиме
      });

    if (dbError) {
      logger.error('Database error', { error: dbError });
      throw dbError;
    }

    // Создаем подписку в CloudPayments только если это не тестовый режим
    if (TestMode !== '1') {
      await createCloudPaymentsSubscription(
        `${CardType}:${CardFirstSix}:${CardLastFour}`,
        AccountId || TransactionId
      );
    }

    // Отправляем письмо
    await sendEmail(
      Email,
      'Ваш однодневный план питания',
      'Спасибо за оплату! Вот ваш однодневный план питания: https://dietfit-plan.ru/pdfs/oneday.pdf',
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Спасибо за оплату!</h2>
          <p>Вот ваш однодневный план питания:</p>
          <p><a href="https://dietfit-plan.ru/pdfs/oneday.pdf" style="color: #22c55e;">Скачать план питания</a></p>
        </div>
      `
    );

    logger.info('Payment success processed successfully', { email: Email });
    res.json({ success: true });
  } catch (error) {
    logger.error('Error processing payment success', { error: error instanceof Error ? error.message : 'Unknown error' });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Recurring payment webhook
app.post('/api/payment-recurrent', async (req, res) => {
  try {
    logger.info('Received recurring payment webhook', { body: req.body });
    
    const { Status, AccountId } = req.body;

    if (Status !== 'Completed') {
      logger.info('Recurring payment not completed', { status: Status });
      return res.json({ success: false });
    }

    // Get subscription from database
    const { data: subscription, error: dbError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('accountid', AccountId)
      .single();

    if (dbError || !subscription) {
      logger.error('Database error or subscription not found', { error: dbError });
      throw dbError || new Error('Subscription not found');
    }

    if (!subscription.subscriptionactive || subscription.currentweek > 12) {
      logger.info('Subscription inactive or completed', { 
        active: subscription.subscriptionactive, 
        week: subscription.currentweek 
      });
      return res.json({ success: false });
    }

    // Send weekly plan email
    await sendEmail(
      subscription.email,
      `Ваш план питания – неделя №${subscription.currentweek}`,
      `Спасибо за продление! Вот ваш рацион на эту неделю: https://dietfit-plan.ru/pdfs/week${subscription.currentweek}.pdf`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Спасибо за продление!</h2>
          <p>Вот ваш рацион на эту неделю:</p>
          <p><a href="https://dietfit-plan.ru/pdfs/week${subscription.currentweek}.pdf" style="color: #22c55e;">Скачать план питания</a></p>
        </div>
      `
    );

    // Update subscription status
    const newWeek = subscription.currentweek + 1;
    if (newWeek > 12) {
      // Disable subscription if completed all weeks
      await supabase
        .from('subscriptions')
        .update({
          currentweek: newWeek,
          subscriptionactive: false
        })
        .eq('id', subscription.id);

      await disableCloudPaymentsSubscription(subscription.id);
      logger.info('Subscription completed and disabled', { id: subscription.id });
    } else {
      // Update current week
      await supabase
        .from('subscriptions')
        .update({ currentweek: newWeek })
        .eq('id', subscription.id);
      
      logger.info('Subscription week updated', { id: subscription.id, newWeek });
    }

    res.json({ success: true });
  } catch (error) {
    logger.error('Error processing recurring payment', { error: error instanceof Error ? error.message : 'Unknown error' });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { email, userName } = req.body;

    if (!email || !isEmail(email)) {
      logger.warn('Invalid email format', { email });
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    await sendEmail(
      email,
      'Ваш персональный план питания',
      `Здравствуйте${userName ? `, ${userName}` : ''}!\n\nСпасибо за заказ персонального плана питания.\n\nВо вложении вы найдете ваш индивидуальный план.\n\nС уважением,\nКоманда FoodPlan`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Здравствуйте${userName ? `, ${userName}` : ''}!</h2>
          <p>Спасибо за заказ персонального плана питания.</p>
          <p>Во вложении вы найдете ваш индивидуальный план.</p>
          <p style="margin-top: 24px;">С уважением,<br>Команда FoodPlan</p>
        </div>
      `
    );

    logger.info('Email sent successfully', { email });
    res.json({ success: true });
  } catch (error) {
    logger.error('Error sending email', { error: error instanceof Error ? error.message : 'Unknown error' });
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Catch-all route for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  logger.info(`Server started on port ${port}`);
});