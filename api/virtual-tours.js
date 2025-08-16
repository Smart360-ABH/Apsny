\
  const fs = require("fs");
  const path = require("path");
  const assetsDir = path.resolve(__dirname, "..", "attached_assets");

  module.exports = async (req, res) => {
    try {
      if (req.method === "GET") {
        if (!fs.existsSync(assetsDir)) {
          res.json({ tours: [] });
          return;
        }
        const files = fs.readdirSync(assetsDir).filter(f => !f.startsWith("."));
        const tours = files.map((f, i) => ({ id: i + 1, name: f, file: `/attached_assets/${f}` }));
        res.json({ tours });
        return;
      }
      res.status(405).json({ message: "Method not allowed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
