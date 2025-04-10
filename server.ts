import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { isEmail } from './src/utils/validation';
import { logger } from './src/utils/logger';
import axios from 'axios';

dotenv.config();

const app = express();
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

const UNISENDER_API_URL = 'https://api.unisender.com/ru/api';

async function validatePdfContent(content: string): Promise<boolean> {
  try {
    const buffer = Buffer.from(content, 'base64');
    return buffer.length > 0 && buffer.toString('ascii').startsWith('%PDF');
  } catch (error) {
    return false;
  }
}

async function sendEmailWithRetry(params: any, retryCount = 0): Promise<any> {
  try {
    const response = await axios.post(`${UNISENDER_API_URL}/sendEmail`, {
      api_key: process.env.UNISENDER_API_KEY,
      format: 'json',
      ...params
    });
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    return response.data.result;
  } catch (error) {
    if (retryCount < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return sendEmailWithRetry(params, retryCount + 1);
    }
    throw error;
  }
}

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
