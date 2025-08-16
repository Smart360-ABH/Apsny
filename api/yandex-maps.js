\
  module.exports = async (req, res) => {
    try {
      if (req.method === "POST") {
        const entry = req.body || {};
        // For now, just echo back and pretend saved
        res.json({ ok: true, entry });
        return;
      }
      res.status(405).json({ message: "Method not allowed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
