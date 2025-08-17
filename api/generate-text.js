\
// [removed chatbot-related line]

  function generateMockText(topic, audience, length) {
    const base = `Тема: ${topic || "не указана"}. Аудитория: ${audience || "все"}. Длина: ${length || "средняя"}.`;
    if ((length || "").toLowerCase().includes("short") || (length || "").toLowerCase().includes("корот")) {
      return base + " Короткий продающий текст: Закажите прямо сейчас!";
    }
    return base + " Развернутый коммерческий текст: Наша команда предлагает... (примерный текст).";
  }

  module.exports = async (req, res) => {
    try {
      if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
        return;
      }
      const { topic, audience, length } = req.body || {};
// [removed chatbot-related line]
      if (apiKey && apiKey !== "default_key") {
        try {
// [removed chatbot-related line]
          const prompt = `Создай коммерческий текст на русском языке. Тема: ${topic}. Целевая аудитория: ${audience}. Длина: ${length}.`;
          const aiResponse = await client.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 400,
            temperature: 0.7,
          });
          const text = aiResponse?.choices?.[0]?.message?.content || "";
          res.json({ text });
          return;
        } catch (err) {
// [removed chatbot-related line]
        }
      }
      const text = generateMockText(topic, audience, length);
      res.json({ text });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };