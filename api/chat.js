// api/chat.js and api/chatbot.js - CommonJS handler for Vercel Node serverless
const fetch = global.fetch || (await import('node-fetch')).default; // node 18+ has global fetch; fallback to node-fetch if not available

module.exports = async function (req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).end('Method Not Allowed');
    }

    let body = req.body;
    if (!body || Object.keys(body).length === 0) {
      // Some runtimes provide body as string
      try { body = JSON.parse(req.body || '{}'); } catch (e) { body = req.body; }
    }

    const message = (body && body.message) ? String(body.message) : null;
    if (!message) return res.status(400).json({ error: 'Missing message' });

    const key = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY;
    if (!key) return res.status(500).json({ error: 'OpenAI API key not configured' });

    const model = (body.model && String(body.model)) || process.env.DEFAULT_OPENAI_MODEL || 'gpt-3.5-turbo';
    const temperature = typeof body.temperature === 'number' ? body.temperature : 0.7;

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: message }],
        temperature,
        max_tokens: 800,
      }),
    });

    const text = await resp.text();
    if (!resp.ok) {
      // return OpenAI error body for debugging
      return res.status(resp.status).json({ error: 'OpenAI error', detail: text });
    }

    let data;
    try { data = JSON.parse(text); } catch (e) { data = { raw: text }; }

    const reply = data?.choices?.[0]?.message?.content || data?.choices?.[0]?.text || null;
    return res.status(200).json({ reply, raw: data });
  } catch (err) {
    console.error('chat handler error', err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
};
