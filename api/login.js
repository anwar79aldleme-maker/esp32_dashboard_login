export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { username, password } = req.body || {};

  // ⚠️ عدل القيم كما تريد
  const ADMIN_USER = process.env.DASH_USER;
  const ADMIN_PASS = process.env.DASH_PASS;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.status(200).json({
      success: true,
      token: "esp32-dashboard-token"
    });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
}
