
const fs = require("fs");
const path = require("path");
const { z } = require("zod");
const dataPath = path.resolve(__dirname, "..", "..", "data", "users.json");
const schema = z.object({ username: z.string().min(1), password: z.string().min(1) });

function readUsers() {
  try { return fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath,"utf8")||"[]") : []; } catch(e){return [];}
}

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") { res.status(405).json({ message: "Method not allowed" }); return; }
    const parsed = schema.safeParse(req.body || {});
    if (!parsed.success) { res.status(400).json({ message: "Invalid payload" }); return; }
    const { username, password } = parsed.data;
    const users = readUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) { res.status(401).json({ message: "Invalid credentials" }); return; }
    res.json({ ok: true, token: "mock-token-123", user: { username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
