import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
// Colocar las rutas de los endpoints
import authRoutes from './routes/authRoutes.js'
import estudianteRoutes from './routes/estudianteRoutes.js'
import materiaRoutes from './routes/materiaRoutes.js'
import matriculaRoutes from './routes/matriculaRoutes.js'
dotenv.config()

// Inicializaciones
const app = express()

// Configuraciones
app.set('port', process.env.PORT || 3000)

// Middlewares
app.use(express.json())
app.use(cors())

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('SERVER ON')
})

//Ruta para login
app.use('/api/auth', authRoutes)
//Ruta para estudiantes
app.use('/api/estudiantes', estudianteRoutes)
//Ruta para materias
app.use('/api/materias', materiaRoutes)
// Ruta para matrículas
app.use('/api/matriculas', matriculaRoutes)

export default app