import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

export const optimizeRoute = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Extracted all new advanced parameters from the Dashboard UI
    const { 
      medicines, 
      location, 
      maxDistance, 
      urgency, 
      budgetPriority,
      transportMode,
      preferredNetwork,
      maxStops,
      allowGenerics
    } = req.body;
    
    if (!medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({ error: 'Please provide a list of medicines to optimize for.' });
    }

    console.log(`[Optimization Engine] Triggering C++ Engine for ${medicines.length} items...`);
    console.log(`[Engine Params] Transport: ${transportMode}, Max Stops: ${maxStops}, Generics: ${allowGenerics}`);

    // In a full 15k LOC app, we would write the JSON parameters to stdin of the C++ process.
    // For this architectural scaffold, we'll execute the compiled binary and capture its mock stdout.
    
    const binaryPath = path.resolve(__dirname, '../../../optimization/optimizer');
    
    if (!fs.existsSync(binaryPath)) {
        return res.status(500).json({ error: 'C++ Optimization engine binary not found. Please compile it first.' });
    }

    // Execute C++ Engine
    exec(binaryPath, (error, stdout, stderr) => {
        if (error) {
            console.error(`[C++ Engine Error]: ${error.message}`);
            return res.status(500).json({ error: 'Failed to run optimization engine' });
        }
        
        try {
            const result = JSON.parse(stdout);
            
            // Mocking the Python ML data injection
            result.predictions = {
                demand_spike: false,
                estimated_delivery_mins: transportMode === 'Walking' ? 45 : 25, // dynamic based on new UI param
                network_used: preferredNetwork || 'All Pharmacies',
                generics_substituted: allowGenerics ? 1 : 0
            };
            
            res.json(result);
        } catch (parseError) {
             console.error(`[C++ Engine Output Parse Error]: ${stdout}`);
             res.status(500).json({ error: 'Invalid output from optimization engine' });
        }
    });

  } catch (error) {
    next(error);
  }
};
