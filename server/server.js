// Minimal Express server to proxy requests to Gemini / Google GenAI server-side.
// Run this alongside your Vite app (or deploy to your host under your domain).
// Requires environment variable GEMINI_API_KEY (do not commit keys).

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS for development
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://emanatee.org' 
    : ['http://localhost:5173', 'http://localhost:3000'], // Vite's default port and a fallback
  credentials: true
}));

app.use(bodyParser.json());

// serve uploaded resumes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Instagram API endpoint
app.get('/api/instagram', async (req, res) => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const businessId = req.query.business_id || process.env.INSTAGRAM_BUSINESS_ID;
    
    if (!accessToken) {
      throw new Error('Instagram access token not configured');
    }
    
    // Fetch media from Instagram Graph API
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${businessId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`
    );
    
    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Instagram API error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send application to email, do not store in DB or file
app.post('/api/join', async (req, res) => {
  try {
    const data = req.body || {};
    const required = ['type', 'name', 'email', 'consent'];
    for (const k of required) {
      if (!data[k]) return res.status(400).json({ error: `${k} is required` });
    }

    // Configure nodemailer (use your SMTP credentials). If none provided, use Ethereal for local testing.
    let transporter;
    let usingTestAccount = false;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Create Ethereal test account for local testing
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      usingTestAccount = true;
      console.warn('No SMTP credentials provided — using Ethereal test account for local email previews.');
    }

    const recipient = process.env.APPLICATIONS_EMAIL || 'emanateevimatters@gmail.com';

    // Build a simple, professional HTML message and a plain-text fallback
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.4;color:#111">
        <h2 style="color:#0ea5a4">New ${data.type} application</h2>
        <table cellpadding="6" style="border-collapse:collapse;">
          <tr><td><strong>Name</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${data.phone || ''}</td></tr>
          <tr><td><strong>Type</strong></td><td>${data.type}</td></tr>
          <tr><td><strong>Consent</strong></td><td>${data.consent ? 'Yes' : 'No'}</td></tr>
        </table>
        <h3 style="margin-top:12px">Message</h3>
        <div style="white-space:pre-wrap;border-left:3px solid #e6f6f6;padding:8px;background:#f9f9f9">${data.message || ''}</div>
      </div>
    `;

    const text = `New ${data.type} application\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || ''}\nType: ${data.type}\nConsent: ${data.consent ? 'Yes' : 'No'}\n\nMessage:\n${data.message || ''}`;

    let mailOptions = {
      from: `EMANATE Applications <${process.env.SMTP_USER || 'no-reply@example.com'}>`,
      to: recipient,
      subject: `New ${data.type} application from ${data.name}`,
      text,
      html,
      attachments: [],
    };

    if (data.resumeBase64 && data.resumeName) {
      mailOptions.attachments.push({
        filename: data.resumeName,
        content: Buffer.from(data.resumeBase64, 'base64'),
      });
    }

    const info = await transporter.sendMail(mailOptions);
    if (usingTestAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Preview URL:', previewUrl);
      return res.json({ ok: true, previewUrl });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error('Join endpoint error', err);
    return res.status(500).json({ error: (err && err.message) || String(err) });
  }
});

// Contact form endpoint - send contact messages to configured email
app.post('/api/contact', async (req, res) => {
  try {
    const data = req.body || {};
    const required = ['name', 'email', 'subject', 'message'];
    for (const k of required) {
      if (!data[k]) return res.status(400).json({ error: `${k} is required` });
    }

    let transporter;
    let usingTestAccount = false;
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      usingTestAccount = true;
      console.warn('No SMTP credentials provided — using Ethereal test account for local email previews.');
    }

    const recipient = process.env.CONTACT_EMAIL || process.env.APPLICATIONS_EMAIL || 'emanateevimatters@gmail.com';

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;line-height:1.4;color:#111">
        <h2 style="color:#0ea5a4">Contact message: ${escapeHtml(data.subject)}</h2>
        <table cellpadding="6" style="border-collapse:collapse;">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
        </table>
        <h3 style="margin-top:12px">Message</h3>
        <div style="white-space:pre-wrap;border-left:3px solid #e6f6f6;padding:8px;background:#f9f9f9">${escapeHtml(data.message)}</div>
      </div>
    `;

    const text = `Contact message: ${data.subject}\nName: ${data.name}\nEmail: ${data.email}\n\n${data.message}`;

    const mailOptions = {
      from: `${process.env.SMTP_FROM || 'EMANATE Website'} <${process.env.SMTP_USER || 'no-reply@example.com'}>`,
      to: recipient,
      subject: `[Website] ${data.subject}`,
      text,
      html,
      replyTo: data.email,
    };

    const info = await transporter.sendMail(mailOptions);
    if (usingTestAccount) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('Preview URL:', previewUrl);
      return res.json({ ok: true, previewUrl });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error('Contact endpoint error', err);
    return res.status(500).json({ error: (err && err.message) || String(err) });
  }
});

// small helper to avoid naive HTML injection in email bodies
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.post('/api/genai', async (req, res) => {
  try {
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
    // Try to load the Google Generative AI package dynamically.
    // If it's not installed this endpoint will respond with 501 so the server can still run locally.
    let pkg;
    try {
      pkg = await import('@google/generai');
    } catch (e) {
      console.warn('Generative AI package not available, /api/genai disabled');
      return res.status(501).json({ error: 'Generative AI integration not available on this server.' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Server missing GEMINI_API_KEY' });

    const { GoogleGenerativeAI } = pkg;
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({ history: [{ role: 'user', parts: prompt }] });
    const response = await chat.sendMessage(prompt);
    const result = await response.response;
    const text = result.text();
    return res.json({ text });
  } catch (err) {
    console.error('GenAI proxy error', err);
    return res.status(500).json({ error: (err && err.message) || String(err) });
  }
});

app.listen(port, () => {
  console.log(`Server API listening on port ${port}`);
});
