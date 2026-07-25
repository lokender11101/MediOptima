import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import optimizeRoutes from './routes/optimizeRoutes';
import pharmacyRoutes from './routes/pharmacyRoutes';
import { errorHandler } from './middleware/error';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/optimize', optimizeRoutes);
app.use('/api/pharmacies', pharmacyRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'MediOptima Backend API is running' });
});

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
