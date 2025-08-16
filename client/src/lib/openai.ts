import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "default_key"
});

export async function generateText(topic: string, audience: string, length: string): Promise<string> {
  try {
    const prompt = `Создай коммерческий текст на русском языке по следующим параметрам:
Тема: ${topic}
Целевая аудитория: ${audience}
Длина: ${length}

Текст должен быть убедительным, профессиональным и подходящим для российского рынка. 
Используй современную лексику и избегай клише. Добавь призыв к действию в конце.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
      max_tokens: length === "Короткий (до 100 слов)" ? 150 : length === "Средний (100-300 слов)" ? 400 : 600,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("OpenAI error:", error);
    throw new Error("Не удалось сгенерировать текст");
  }
}

export async function chatWithBot(message: string): Promise<string> {
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

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [{ role: "user", content: prompt }],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0].message.content || "";
  } catch (error) {
    console.error("OpenAI error:", error);
    throw new Error("Не удалось получить ответ от чат-бота");
  }
}
