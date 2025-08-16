
const fs = require("fs");
const path = require("path");
module.exports = async (req, res) => {
  try {
    const id = req.query && req.query.id || (req.method==='GET' && req.url && req.url.split('/').slice(-2,-1)[0]);
    // For simplicity we treat id as filename
    if (!id) { res.status(400).json({ message: "id required" }); return; }
    const assetsDir = path.resolve(__dirname, "..", "..", "attached_assets");
    const filepath = path.join(assetsDir, id);
    if (!fs.existsSync(filepath)) { res.status(404).json({ message: "Not found" }); return; }
    const stat = fs.statSync(filepath);
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", "application/octet-stream");
    const stream = fs.createReadStream(filepath);
    stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
