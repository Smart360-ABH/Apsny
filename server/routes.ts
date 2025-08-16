import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertYandexMapsEntrySchema, insertGeneratedTextSchema, insertVirtualTourSchema } from "@shared/schema";
import multer, { type Multer } from "multer";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import OpenAI from "openai";

// Extend Express Request interface for file uploads
interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

// Setup file upload
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Setup OpenAI
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "default_key"
});

// Setup email transporter
const createEmailTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Lead management routes
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      
      // Send email notification if configured
      const transporter = createEmailTransporter();
      if (transporter) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.NOTIFICATION_EMAIL || "Service-abh@yandex.ru",
            subject: "Новая заявка с сайта Smart 360",
            html: `
              <h3>Новая заявка</h3>
              <p><strong>Имя:</strong> ${lead.name}</p>
              <p><strong>Телефон:</strong> ${lead.phone}</p>
              <p><strong>Email:</strong> ${lead.email || 'Не указан'}</p>
              <p><strong>Услуга:</strong> ${lead.service}</p>
              <p><strong>Сообщение:</strong> ${lead.message || 'Не указано'}</p>
              <p><strong>Дата:</strong> ${new Date(lead.createdAt!).toLocaleString('ru-RU')}</p>
            `
          });
        } catch (emailError) {
          console.error("Email sending failed:", emailError);
        }
      }
      
      res.json(lead);
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid lead data", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  app.patch("/api/leads/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedLead = await storage.updateLeadStatus(id, status);
      if (!updatedLead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      res.json(updatedLead);
    } catch (error) {
      res.status(500).json({ message: "Failed to update lead status" });
    }
  });

  // Export leads as CSV
  app.get("/api/leads/export/csv", async (req, res) => {
    try {
      const leads = await storage.getLeads();
      
      const csvHeader = "ID,Name,Phone,Email,Service,Message,Status,Created At\n";
      const csvData = leads.map(lead => 
        `"${lead.id}","${lead.name}","${lead.phone}","${lead.email || ''}","${lead.service}","${lead.message || ''}","${lead.status}","${new Date(lead.createdAt!).toISOString()}"`
      ).join("\n");
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
      res.send(csvHeader + csvData);
    } catch (error) {
      res.status(500).json({ message: "Failed to export leads" });
    }
  });

  // Virtual tour routes
  app.post("/api/virtual-tours", upload.single('file'), async (req: RequestWithFile, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }

      const tour = await storage.createVirtualTour({
        name,
        filename: req.file.originalname,
        filePath: req.file.path
      });

      res.json(tour);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to upload virtual tour", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.get("/api/virtual-tours", async (req, res) => {
    try {
      const tours = await storage.getVirtualTours();
      res.json(tours);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch virtual tours" });
    }
  });

  app.get("/api/virtual-tours/:id/file", async (req, res) => {
    try {
      const { id } = req.params;
      const tour = await storage.getVirtualTourById(id);
      
      if (!tour || !fs.existsSync(tour.filePath)) {
        return res.status(404).json({ message: "File not found" });
      }

      res.sendFile(path.resolve(tour.filePath));
    } catch (error) {
      res.status(500).json({ message: "Failed to serve file" });
    }
  });

  app.delete("/api/virtual-tours/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteVirtualTour(id);
      if (!success) {
        return res.status(404).json({ message: "Virtual tour not found" });
      }
      res.json({ message: "Virtual tour deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete virtual tour" });
    }
  });

  // Yandex Maps routes
  app.post("/api/yandex-maps", async (req, res) => {
    try {
      const entryData = insertYandexMapsEntrySchema.parse(req.body);
      const entry = await storage.createYandexMapsEntry(entryData);
      res.json(entry);
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid Yandex Maps data", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  app.get("/api/yandex-maps", async (req, res) => {
    try {
      const entries = await storage.getYandexMapsEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Yandex Maps entries" });
    }
  });

  app.get("/api/yandex-maps/:id/export", async (req, res) => {
    try {
      const { id } = req.params;
      const entry = await storage.getYandexMapsEntryById(id);
      
      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="yandex-maps-${entry.organizationName.replace(/\s+/g, '-')}.json"`);
      res.send(entry.jsonData);
    } catch (error) {
      res.status(500).json({ message: "Failed to export entry" });
    }
  });

  // Text generation routes
  app.post("/api/generate-text", async (req, res) => {
    try {
      const { topic, audience, length } = req.body;
      
      if (!topic || !audience || !length) {
        return res.status(400).json({ message: "Topic, audience, and length are required" });
      }

      let generatedText = "";
      
      // Try OpenAI if API key is available
      if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "default_key") {
        try {
          const prompt = `Создай коммерческий текст на русском языке по следующим параметрам:
Тема: ${topic}
Целевая аудитория: ${audience}
Длина: ${length}

Текст должен быть убедительным, профессиональным и подходящим для российского рынка. Используй современную лексику и избегай клише.`;

          const response = await openai.chat.completions.create({
            model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
            messages: [{ role: "user", content: prompt }],
            max_tokens: length === "Короткий (до 100 слов)" ? 150 : length === "Средний (100-300 слов)" ? 400 : 600,
            temperature: 0.7,
          });

          generatedText = response.choices[0].message.content || "";
        } catch (openaiError) {
          console.error("OpenAI error:", openaiError);
          // Fall back to mock response
          generatedText = generateMockText(topic, audience, length);
        }
      } else {
        // Use mock response when no API key
        generatedText = generateMockText(topic, audience, length);
      }

      const textEntry = await storage.createGeneratedText({
        topic,
        audience,
        length,
        generatedText
      });

      res.json(textEntry);
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to generate text", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Chatbot routes
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ message: "Message is required" });
      }

      let response = "";

      // Try OpenAI if API key is available
      if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "default_key") {
        try {
          const prompt = `Ты - помощник агентства Smart 360, которое предоставляет услуги:
- Создание сайтов (персональных и корпоративных)
- Чат-боты и агенты ИИ
- Интеграция в Яндекс.Карты
- Виртуальные туры 360°
- Реклама в Instagram
- Коммерческие тексты
- Бизнес-планы

Контакты:
- Адрес: г. Сухум, ул. Эшба 166
- Телефоны: +7 940 766-66-44, +7 940 943-55-55
- Email: Service-abh@yandex.ru

Отвечай на русском языке, будь дружелюбным и профессиональным. Вопрос пользователя: ${message}`;

          const aiResponse = await openai.chat.completions.create({
            model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
            messages: [{ role: "user", content: prompt }],
            max_tokens: 300,
            temperature: 0.7,
          });

          response = aiResponse.choices[0].message.content || "";
        } catch (openaiError) {
          console.error("OpenAI error:", openaiError);
          response = getMockChatbotResponse(message);
        }
      } else {
        response = getMockChatbotResponse(message);
      }

      res.json({ response });
    } catch (error) {
      res.status(500).json({ 
        message: "Failed to process chatbot request", 
        error: error instanceof Error ? error.message : String(error)
      });
    }
  });

  // Authentication route
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In production, use proper JWT or session management
      res.json({ user: { id: user.id, username: user.username }, token: "mock-jwt-token" });
    } catch (error) {
      res.status(500).json({ message: "Authentication failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions
function generateMockText(topic: string, audience: string, length: string): string {
  const templates = {
    short: `🚀 ${topic} для ${audience}

Smart 360 поможет вам достичь новых высот! Наши эксперты создадут индивидуальное решение, которое увеличит вашу прибыль и привлечет больше клиентов.

📞 Звоните: +7 940 943-55-55
📧 Email: Service-abh@yandex.ru`,

    medium: `🎯 ${topic} - ваш путь к успеху!

Для ${audience} мы предлагаем комплексные цифровые решения, которые работают на результат:

✅ Современные технологии
✅ Индивидуальный подход
✅ Гарантированный результат
✅ Техническая поддержка

Smart 360 - это команда профессионалов с многолетним опытом. Мы знаем, как превратить ваши идеи в прибыльный бизнес.

Не упустите возможность! Получите консультацию прямо сейчас.

📍 г. Сухум, ул. Эшба 166
📞 +7 940 766-66-44, +7 940 943-55-55
📧 Service-abh@yandex.ru`,

    long: `🌟 ${topic} - революционное решение для ${audience}!

В мире высоких технологий каждая компания нуждается в надежном партнере. Smart 360 - это ваш проводник в цифровое будущее!

🎯 Что мы предлагаем:
• Создание сайтов любой сложности
• Умные чат-боты с искусственным интеллектом
• Полная интеграция с Яндекс.Картами
• Захватывающие виртуальные туры 360°
• Эффективная реклама в Instagram
• Продающие тексты от профессиональных копирайтеров
• Детальные бизнес-планы для развития

💡 Почему выбирают нас:
- Более 5 лет успешной работы
- 200+ довольных клиентов
- Индивидуальный подход к каждому проекту
- Современные технологии и инструменты
- Полное сопровождение от идеи до результата

🚀 Наши преимущества:
✓ Быстрые сроки выполнения
✓ Прозрачное ценообразование
✓ Гарантия качества
✓ Техническая поддержка 24/7
✓ Обучение команды клиента

Не откладывайте успех на завтра! Каждый день промедления - это упущенная прибыль.

📞 Свяжитесь с нами прямо сейчас:
📍 Офис: г. Сухум, ул. Эшба 166
☎️ Телефоны: +7 940 766-66-44, +7 940 943-55-55
📧 Email: Service-abh@yandex.ru
💬 WhatsApp: быстрая связь и консультации

Smart 360 - умные решения для умного бизнеса! 🎯`
  };

  if (length.includes("Короткий")) return templates.short;
  if (length.includes("Средний")) return templates.medium;
  return templates.long;
}

function getMockChatbotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes("сайт") || lowerMessage.includes("веб")) {
    return "Smart 360 создаёт современные сайты для любого бизнеса! Мы делаем персональные и корпоративные сайты с адаптивным дизайном и SEO-оптимизацией. Хотите узнать больше? Звоните +7 940 766-66-44!";
  }
  
  if (lowerMessage.includes("бот") || lowerMessage.includes("ии") || lowerMessage.includes("искусственный")) {
    return "Наши чат-боты с ИИ увеличивают конверсию на 30-50%! Они работают 24/7, отвечают на вопросы клиентов и помогают с продажами. Телефон для консультации: +7 940 943-55-55.";
  }
  
  if (lowerMessage.includes("карт") || lowerMessage.includes("яндекс")) {
    return "Мы поможем вашему бизнесу появиться на Яндекс.Картах! Полное заполнение атрибутов, каталоги товаров, фотографии и отзывы. Больше клиентов найдут вас! Пишите: Service-abh@yandex.ru";
  }
  
  if (lowerMessage.includes("тур") || lowerMessage.includes("360")) {
    return "Виртуальные туры 360° покажут ваше заведение в лучшем свете! Клиенты смогут 'прогуляться' по вашему офису, ресторану или магазину прямо с телефона. Звоните: +7 940 943-55-55!";
  }
  
  if (lowerMessage.includes("цена") || lowerMessage.includes("стоимость") || lowerMessage.includes("сколько")) {
    return "У нас есть тарифы на любой бюджет: от 15,000₽ за лендинг до 75,000₽ за комплексное решение. Точную стоимость рассчитаем индивидуально. Получите консультацию: +7 940 766-66-44!";
  }
  
  if (lowerMessage.includes("контакт") || lowerMessage.includes("телефон") || lowerMessage.includes("адрес")) {
    return "📍 Наш офис: г. Сухум, ул. Эшба 166\n📞 Телефоны: +7 940 766-66-44, +7 940 943-55-55\n📧 Email: Service-abh@yandex.ru\n💬 WhatsApp: wa.me/79409435555";
  }
  
  return "Привет! Я помощник Smart 360 🤖 Мы создаём сайты, чат-ботов, интегрируем с Яндекс.Картами и предоставляем полный цикл цифровых услуг. Задавайте любые вопросы о наших услугах! Или звоните напрямую: +7 940 943-55-55";
}
