// api/chat.js - simple Vercel Node serverless function (CommonJS)
// Expects POST { message: string } and returns { reply: string }
// Reads OPENAI_API_KEY from environment variable.

module.exports = async function (req, res) {
  try {
    if (req.method === 'GET') {
      return res.status(200).json({ ok: true, msg: 'API /api/chat reachable. Use POST with JSON { message }' });
    }
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'GET, POST');
      return res.status(405).end('Method Not Allowed');
    }

    let body = req.body;
    if (!body || (typeof body === 'string' && body.trim() === '')) {
      try { body = JSON.parse(req.body || '{}'); } catch (e) { body = req.body; }
    }

    const message = body && body.message ? String(body.message) : null;
    if (!message) return res.status(400).json({ error: 'Missing message' });

    const key = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY;
    if (!key) return res.status(500).json({ error: 'OPENAI_API_KEY not configured' });

    const model = body.model || process.env.DEFAULT_OPENAI_MODEL || 'gpt-3.5-turbo';
    const temperature = typeof body.temperature === 'number' ? body.temperature : 0.7;

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: message }],
        temperature,
        max_tokens: 800
      })
    });

    const text = await resp.text();
    if (!resp.ok) return res.status(resp.status).json({ error: 'OpenAI error', detail: text });

    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    const reply = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text ?? null;
    return res.status(200).json({ reply, raw: data });
  } catch (err) {
    console.error('chat handler error', err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
};
