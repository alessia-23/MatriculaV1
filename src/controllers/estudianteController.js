import Estudiante from "../models/Estudiante.js";
import mongoose from "mongoose";

// CREAR ESTUDIANTE
const crearEstudiante = async (req, res) => {
    try {
        const {nombre,apellido,cedula,fecha_nacimiento,ciudad,direccion,telefono,email} = req.body;
        // Validar campos obligatorios
        if (!nombre || !apellido || !cedula || !fecha_nacimiento || !direccion || !email) {
            return res.status(400).json({
                error: "Campos obligatorios incompletos"
            });
        }
        // Verificar cédula duplicada
        const existeEstudiante = await Estudiante.findOne({ cedula });
        if (existeEstudiante) {
            return res.status(400).json({
                error: "La cédula ya está registrada"
            });
        }
        // Crear estudiante usando solo los campos permitidos
        const estudiante = new Estudiante({nombre,apellido,cedula,fecha_nacimiento,ciudad,direccion,telefono,email});
        await estudiante.save();
        res.status(201).json({
            message: "Estudiante creado correctamente",
            estudiante
        });
    } catch (error) {
        // Capturar errores de validación del modelo
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: error.message
            });
        }
        res.status(500).json({
            error: "Error del servidor"
        });
    }
};

// OBTENER TODOS
const obtenerEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json({
            estudiantes
        });
    } catch (error) {
        res.status(500).json({
            error: "Error del servidor"});
    }
};

// BUSCAR POR CEDULA O APELLIDO
const buscarEstudiante = async (req, res) => {
    try {
        let { cedula, apellido } = req.query;
        if (cedula) cedula = cedula.trim();
        if (apellido) apellido = apellido.trim();
        if (!cedula && !apellido) {
            return res.status(400).json({
                error: "Debe enviar cédula o apellido"
            });
        }
        let filtro = {};
        if (cedula) {
            filtro.cedula = cedula;
        }
        if (apellido) {
            filtro.apellido = apellido;
        }
        const estudiantes = await Estudiante
            .find(filtro)
            .collation({ locale: "es", strength: 1 });
        if (estudiantes.length === 0) {
            return res.status(404).json({
                error: "No se encontraron estudiantes"
            });
        }
        res.json({ estudiantes });
    } catch (error) {
        res.status(500).json({
            error: "Error del servidor"
        });
    }
};

// ACTUALIZAR
const actualizarEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        // Validar formato ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "ID no válido"
            });
        }
        const estudiante = await Estudiante.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true  
            }
        );
        if (!estudiante) {
            return res.status(404).json({
                error: "Estudiante no encontrado"
            });
        }
        res.json({
            message: "Estudiante actualizado correctamente",
            estudiante
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                error: error.message
            });
        }
        res.status(500).json({
            error: "Error del servidor"
        });
    }
};

// ELIMINAR
const eliminarEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        // Validar ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "ID no válido"
            });
        }
        const estudiante = await Estudiante.findByIdAndDelete(id);
        if (!estudiante) {
            return res.status(404).json({
                error: "Estudiante no encontrado"
            });
        }
        res.json({
            message: "Estudiante eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            error: "Error del servidor"
        });
    }
};

export {
    crearEstudiante,
    obtenerEstudiantes,
    buscarEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};