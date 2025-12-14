import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {

  if (req.method === "POST") {
    const { heartrate, spo2 } = req.body;
    await sql`
      INSERT INTO sensor_data (heartrate, spo2)
      VALUES (${heartrate}, ${spo2})
    `;
    return res.json({ ok:true });
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    await sql`DELETE FROM sensor_data WHERE id=${id}`;
    return res.json({ ok:true });
  }

  res.status(405).json({ message:"Method not allowed" });
}
