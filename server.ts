import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { isEmail } from './src/utils/validation';
import { logger } from './src/utils/logger';
import axios from 'axios';

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
    pass: 'uoqmizgtbcaubzqd'
  }
});

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

const UNISENDER_API_URL = 'https://api.unisender.com/ru/api';
const CLOUDPAYMENTS_API_URL = 'https://api.cloudpayments.ru';

async function sendEmail(to: string, subject: string, text: string, html: string) {
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
}

async function createCloudPaymentsSubscription(token: string, accountId: string) {
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
}

async function disableCloudPaymentsSubscription(subscriptionId: string) {
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
}

// Initial payment webhook
app.post('/api/payment-success', async (req, res) => {
  try {
    const { Status, Token, AccountId, Email } = req.body;

    if (Status !== 'Completed') {
      return res.json({ success: false });
    }

    // Save subscription to database
    const { error: dbError } = await supabase
      .from('subscriptions')
      .insert({
        email: Email,
        accountId: AccountId,
        token: Token,
        currentWeek: 1,
        subscriptionActive: true
      });

    if (dbError) {
      throw dbError;
    }

    // Create CloudPayments subscription
    await createCloudPaymentsSubscription(Token, AccountId);

    // Send welcome email
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

    res.json({ success: true });
  } catch (error) {
    logger.error('Error processing payment success', { error: error instanceof Error ? error.message : 'Unknown error' });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Recurring payment webhook
app.post('/api/payment-recurrent', async (req, res) => {
  try {
    const { Status, AccountId } = req.body;

    if (Status !== 'Completed') {
      return res.json({ success: false });
    }

    // Get subscription from database
    const { data: subscription, error: dbError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('accountId', AccountId)
      .single();

    if (dbError || !subscription) {
      throw dbError || new Error('Subscription not found');
    }

    if (!subscription.subscriptionActive || subscription.currentWeek > 12) {
      return res.json({ success: false });
    }

    // Send weekly plan email
    await sendEmail(
      subscription.email,
      `Ваш план питания – неделя №${subscription.currentWeek}`,
      `Спасибо за продление! Вот ваш рацион на эту неделю: https://dietfit-plan.ru/pdfs/week${subscription.currentWeek}.pdf`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Спасибо за продление!</h2>
          <p>Вот ваш рацион на эту неделю:</p>
          <p><a href="https://dietfit-plan.ru/pdfs/week${subscription.currentWeek}.pdf" style="color: #22c55e;">Скачать план питания</a></p>
        </div>
      `
    );

    // Update subscription status
    const newWeek = subscription.currentWeek + 1;
    if (newWeek > 12) {
      // Disable subscription if completed all weeks
      await supabase
        .from('subscriptions')
        .update({
          currentWeek: newWeek,
          subscriptionActive: false
        })
        .eq('id', subscription.id);

      await disableCloudPaymentsSubscription(subscription.id);
    } else {
      // Update current week
      await supabase
        .from('subscriptions')
        .update({ currentWeek: newWeek })
        .eq('id', subscription.id);
    }

    res.json({ success: true });
  } catch (error) {
    logger.error('Error processing recurring payment', { error: error instanceof Error ? error.message : 'Unknown error' });
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Original email sending endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const { email, userName } = req.body;

    if (!email || !isEmail(email)) {
      logger.warn('Invalid email format', { email });
      return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    if (!process.env.UNISENDER_API_KEY) {
      logger.error('Unisender API key is not configured');
      throw new Error('Unisender API key is not configured');
    }

    if (!process.env.PDF_CONTENT) {
      logger.error('PDF content is not configured');
      throw new Error('PDF content is not configured');
    }

    const isPdfValid = await validatePdfContent(process.env.PDF_CONTENT);
    if (!isPdfValid) {
      logger.error('Invalid PDF content format');
      throw new Error('Invalid PDF content format');
    }

    const result = await sendEmailWithRetry({
      email,
      sender_name: 'FoodPlan',
      sender_email: process.env.SENDER_EMAIL || 'no-reply@foodplan.ru',
      subject: 'Ваш персональный план питания',
      body: `Здравствуйте${userName ? `, ${userName}` : ''}!\n\nСпасибо за заказ персонального плана питания.\n\nВо вложении вы найдете ваш индивидуальный план.\n\nС уважением,\nКоманда FoodPlan`,
      html_body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Здравствуйте${userName ? `, ${userName}` : ''}!</h2>
          <p>Спасибо за заказ персонального плана питания.</p>
          <p>Во вложении вы найдете ваш индивидуальный план.</p>
          <p style="margin-top: 24px;">С уважением,<br>Команда FoodPlan</p>
        </div>
      `,
      attachments_binary: {
        'food-plan.pdf': process.env.PDF_CONTENT
      }
    });

    logger.info('Email sent successfully', { email });
    res.json({ success: true, result });
  } catch (error) {
    logger.error('Error sending email', { error: error instanceof Error ? error.message : 'Unknown error' });
    res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email'
    });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});