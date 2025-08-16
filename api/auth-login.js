\
  module.exports = async (req, res) => {
    try {
      if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" });
        return;
      }
      const { username, password } = req.body || {};
      // Dummy check - in real app, use secure checks
      if (username === "admin" && password === "password") {
        res.json({ ok: true, token: "mock-token-123" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
