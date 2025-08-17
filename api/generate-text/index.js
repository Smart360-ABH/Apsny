
// [removed chatbot-related line]
const fs = require("fs");
const path = require("path");
const { z } = require("zod");
const dataPath = path.resolve(__dirname, "..", "..", "data", "generated_texts.json");

const schema = z.object({
  topic: z.string().min(1),
  audience: z.string().optional(),
  length: z.string().optional()
});

function readAll() {
  try {
    return fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath,"utf8")||"[]") : [];
  } catch (e) { return []; }
}
function writeAll(arr) {
  try { fs.writeFileSync(dataPath, JSON.stringify(arr,null,2),"utf8"); } catch(e){console.error(e);}
}

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") { res.status(405).json({message:"Method not allowed"}); return; }
    const parsed = schema.safeParse(req.body || {});
    if (!parsed.success) { res.status(400).json({ message: "Invalid payload", errors: parsed.error.format() }); return; }
    const { topic, audience, length } = parsed.data;
    let generatedText = null;

// [removed chatbot-related line]
    if (apiKey && apiKey !== "default_key") {
      try {
// [removed chatbot-related line]
        const prompt = `Создай коммерческий текст на русском языке по следующим параметрам:\nТема: ${topic}\nЦелевая аудитория: ${audience||''}\nДлина: ${length||''}\n\nТекст должен быть убедительным, профессиональным и подходящим для российского рынка.`;
        const aiResponse = await client.chat.completions.create({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 400,
          temperature: 0.7,
        });
        generatedText = aiResponse?.choices?.[0]?.message?.content || null;
      } catch (err) {
// [removed chatbot-related line]
      }
    }

    if (!generatedText) {
      generatedText = `Mock: ${topic}. Аудитория: ${audience||'все'}. Длина: ${length||'средняя'}.`;
    }

    const item = { id: Date.now().toString(36), topic, audience, length, generatedText, createdAt: new Date().toISOString() };
    const arr = readAll();
    arr.push(item);
    writeAll(arr);

    res.json({ ok: true, item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};