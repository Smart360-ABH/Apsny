
const fs = require("fs");
const path = require("path");
const { z } = require("zod");

const assetsDir = path.resolve(__dirname, "..", "..", "attached_assets");
const schema = z.object({
  filename: z.string().min(1),
  contentBase64: z.string().min(1) // base64 content
});

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      if (!fs.existsSync(assetsDir)) {
        res.json({ tours: [] });
        return;
      }
      const files = fs.readdirSync(assetsDir).filter(f => !f.startsWith("."));
      const tours = files.map((f,i) => ({ id: String(i+1), name: f, file: `/attached_assets/${f}` }));
      res.json({ tours });
      return;
    }

    if (req.method === "POST") {
      const parsed = schema.safeParse(req.body || {});
      if (!parsed.success) {
        res.status(400).json({ message: "Invalid payload", errors: parsed.error.format() });
        return;
      }
      const { filename, contentBase64 } = parsed.data;
      const buffer = Buffer.from(contentBase64, "base64");
      const target = path.join(assetsDir, filename);
      fs.writeFileSync(target, buffer);
      res.json({ ok: true, filename });
      return;
    }

    if (req.method === "DELETE") {
      // expect query ?id=filename or body { filename }
      const filename = req.query && req.query.filename || (req.body && req.body.filename);
      if (!filename) { res.status(400).json({ message: "filename required" }); return; }
      const target = path.join(assetsDir, filename);
      if (fs.existsSync(target)) {
        fs.unlinkSync(target);
        res.json({ ok: true });
      } else {
        res.status(404).json({ message: "Not found" });
      }
      return;
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
