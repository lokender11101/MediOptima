import { Request, Response, NextFunction } from 'express';
import { query } from '../config/db';

export const getNearbyPharmacies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { lat, lng, radius_km = 5 } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Simplified Haversine formula query for finding nearby pharmacies
    // In a real production system, PostGIS is recommended for spatial queries
    const sql = `
      SELECT id, name, address, lat, lng, reliability_score,
      (
        6371 * acos (
          cos ( radians($1) )
          * cos( radians( lat ) )
          * cos( radians( lng ) - radians($2) )
          + sin ( radians($1) )
          * sin( radians( lat ) )
        )
      ) AS distance
      FROM pharmacies
      HAVING (
        6371 * acos (
          cos ( radians($1) )
          * cos( radians( lat ) )
          * cos( radians( lng ) - radians($2) )
          + sin ( radians($1) )
          * sin( radians( lat ) )
        )
      ) < $3
      ORDER BY distance;
    `;

    // Note: Standard PostgreSQL requires HAVING to be used with GROUP BY or aggregation, 
    // so we might need a subquery for exact distance filtering without PostGIS. 
    // This is a simplified mock for Phase 3 structure.

    // const result = await query(sql, [lat, lng, radius_km]);
    
    // MOCK RESPONSE
    res.json({
      status: 'success',
      data: [
        { id: 1, name: "City Health Pharmacy", distance: 1.2, reliability: 0.95 },
        { id: 2, name: "MediCare Plus", distance: 2.5, reliability: 0.88 }
      ]
    });
  } catch (error) {
    next(error);
  }
};
