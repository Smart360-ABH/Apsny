\
  const fs = require("fs");
  const path = require("path");
  const dataPath = path.resolve(__dirname, "..", "data", "leads.json");

  module.exports = async (req, res) => {
    try {
      if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed" });
        return;
      }
      const leads = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath, "utf8") || "[]") : [];
      const header = "id,name,email,message,createdAt\n";
      const rows = leads.map(l => `${l.id},"${(l.name||'').replace(/"/g,'""')}","${(l.email||'').replace(/"/g,'""')}","${(l.message||'').replace(/"/g,'""')}",${l.createdAt}`).join("\n");
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
      res.send(header + rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
