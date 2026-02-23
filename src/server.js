import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { conectarDB } from './config/database.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import estudianteRoutes from './routes/estudianteRoutes.js';
import materiaRoutes from './routes/materiaRoutes.js';
import matriculaRoutes from './routes/matriculaRoutes.js';

dotenv.config();

const app = express();

// CORS ABIERTOS
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Conectar a la base de datos
conectarDB();

// Rutas
app.use('/api', authRoutes);
app.use('/api', estudianteRoutes);
app.use('/api', materiaRoutes);
app.use('/api', matriculaRoutes);

// PUERTO DINÁMICO
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});