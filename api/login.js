export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { username, password } = req.body || {};

  // متغيرات Vercel
  const DASH_USER = process.env.DASH_USER;
  const DASH_PASS = process.env.DASH_PASS;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing credentials" });
  }

  if (username === DASH_USER && password === DASH_PASS) {
    return res.status(200).json({
      success: true,
      token: "esp32-dashboard-auth"
    });
  }

  return res.status(401).json({ success: false, message: "Invalid login" });
}
