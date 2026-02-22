import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import estudianteRoutes from './routes/estudianteRoutes.js'
import materiaRoutes from './routes/materiaRoutes.js'
import matriculaRoutes from './routes/matriculaRoutes.js'

dotenv.config()

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('SERVER ON')
})

// Rutas
app.use('/api/auth', authRoutes)
app.use('/api/estudiantes', estudianteRoutes)
app.use('/api/materias', materiaRoutes)
app.use('/api/matriculas', matriculaRoutes)

export default app