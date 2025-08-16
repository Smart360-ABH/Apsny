
const fs = require("fs");
const path = require("path");
const { z } = require("zod");
const nodemailer = require("nodemailer");

const dataPath = path.resolve(__dirname, "..", "..", "data", "leads.json");

const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().optional()
});

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

function createTransporterFromEnv() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT,10) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user) return null;
  return nodemailer.createTransport({
    host,
    port: port || 587,
    secure: port === 465,
    auth: { user, pass }
  });
}

module.exports = async (req, res) => {
  try {
    if (req.method === "POST") {
      const parsed = leadSchema.safeParse(req.body || {});
      if (!parsed.success) {
        res.status(400).json({ message: "Invalid payload", errors: parsed.error.format() });
        return;
      }
      const lead = { id: Date.now().toString(36), createdAt: new Date().toISOString(), ...parsed.data };
      const leads = readLeads();
      leads.push(lead);
      writeLeads(leads);

      // Send email notification if SMTP configured
      const transporter = createTransporterFromEnv();
      if (transporter) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: process.env.NOTIFICATION_EMAIL || "Service-abh@yandex.ru",
            subject: "Новая заявка с сайта Smart 360",
            html: `<h3>Новая заявка</h3><p><strong>Имя:</strong> ${lead.name}</p><p><strong>Email:</strong> ${lead.email}</p><p><strong>Сообщение:</strong> ${lead.message || ""}</p>`
          });
        } catch (err) {
          console.error("Failed to send notification email", err);
        }
      }

      res.json({ ok: true, id: lead.id, lead });
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
