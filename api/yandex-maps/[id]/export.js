
const fs = require("fs");
const path = require("path");
module.exports = async (req, res) => {
  try {
    const id = req.query && req.query.id;
    const dataPath = path.resolve(__dirname, "..", "..", "data", "yandex_maps.json");
    const arr = fs.existsSync(dataPath) ? JSON.parse(fs.readFileSync(dataPath,"utf8")||"[]") : [];
    const item = arr.find(i=>i.id==id);
    if (!item) { res.status(404).json({ message: "Not found" }); return; }
    // return CSV
    const header = "id,name,address,lat,lng,createdAt\n";
    const row = `${item.id},"${(item.name||"").replace(/"/g,'""')}","${(item.address||"").replace(/"/g,'""')}",${item.lat||''},${item.lng||''},${item.createdAt}\n`;
    res.setHeader("Content-Type","text/csv");
    res.setHeader("Content-Disposition",`attachment; filename=yandex-${item.id}.csv`);
    res.send(header+row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
