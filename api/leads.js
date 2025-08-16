\
  const fs = require("fs");
  const path = require("path");
  const dataPath = path.resolve(__dirname, "..", "data", "leads.json");

  function readLeads() {
    try {
      const raw = fs.existsSync(dataPath) ? fs.readFileSync(dataPath, "utf8") : "[]";
      return JSON.parse(raw || "[]");
    } catch (e) {
      console.error("readLeads error", e);
      return [];
    }
  }
  function writeLeads(leads) {
    try {
      fs.writeFileSync(dataPath, JSON.stringify(leads, null, 2), "utf8");
    } catch (e) {
      console.error("writeLeads error", e);
    }
  }

  module.exports = async (req, res) => {
    try {
      if (req.method === "POST") {
        const { name, email, message } = req.body || {};
        if (!name || !email) {
          res.status(400).json({ message: "name and email are required" });
          return;
        }
        const leads = readLeads();
        const id = Date.now().toString(36);
        const entry = { id, name, email, message: message || "", createdAt: new Date().toISOString() };
        leads.push(entry);
        writeLeads(leads);
        res.json({ ok: true, id });
        return;
      }
      if (req.method === "GET") {
        const leads = readLeads();
        res.json({ leads });
        return;
      }
      res.status(405).json({ message: "Method not allowed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
