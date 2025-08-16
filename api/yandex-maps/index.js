
const fs = require("fs");
const path = require("path");
const { z } = require("zod");
const dataPath = path.resolve(__dirname, "..", "..", "data", "yandex_maps.json");

const schema = z.object({
  name: z.string().min(1),
  address: z.string().optional(),
  lat: z.number().optional(),
  lng: z.number().optional()
});

function readAll() {
  try { return fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath,"utf8")||"[]") : []; } catch(e){return [];}
}
function writeAll(arr){ try{ fs.writeFileSync(dataPath, JSON.stringify(arr,null,2),"utf8"); }catch(e){console.error(e);} }

module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      const parsed = schema.safeParse(req.body || {});
      if (!parsed.success) { res.status(400).json({ message: "Invalid payload", errors: parsed.error.format() }); return; }
      const entry = { id: Date.now().toString(36), ...parsed.data, createdAt: new Date().toISOString() };
      const arr = readAll();
      arr.push(entry);
      writeAll(arr);
      res.json({ ok: true, entry });
      return;
    }
    if (req.method === "GET") {
      const arr = readAll();
      res.json({ entries: arr });
      return;
    }
    res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
