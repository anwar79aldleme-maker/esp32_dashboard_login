import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);

export default async function handler(req,res){
  try{
    if(req.method === 'GET'){
      const q = req.query.q || '';
      const rows = await sql`
        SELECT * FROM sensor_data
        WHERE CAST(heartrate AS TEXT) ILIKE ${'%'+q+'%'}
           OR CAST(spo2 AS TEXT) ILIKE ${'%'+q+'%'}
        ORDER BY time DESC
        LIMIT 100
      `;
      return res.json(rows);
    }

    if(req.method === 'POST'){
      const {heartrate, spo2} = req.body;
      await sql`
        INSERT INTO sensor_data (heartrate, spo2)
        VALUES (${heartrate}, ${spo2})
      `;
      return res.json({message:'Inserted'});
    }

    if(req.method === 'PUT'){
      const {id, heartrate, spo2} = req.body;
      await sql`
        UPDATE sensor_data
        SET heartrate = COALESCE(${heartrate}, heartrate),
            spo2 = COALESCE(${spo2}, spo2)
        WHERE id=${id}
      `;
      return res.json({message:'Updated'});
    }

    if(req.method === 'DELETE'){
      const {id} = req.body;
      await sql`DELETE FROM sensor_data WHERE id=${id}`;
      return res.json({message:'Deleted'});
    }

    res.status(405).json({message:'Method not allowed'});
  }catch(e){
    res.status(500).json({error:e.message});
  }
}
