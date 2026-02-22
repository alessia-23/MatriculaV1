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

// OBTENER POR ID
const obtenerEstudiante = async (req, res) => {
    try {
        const { id } = req.params;
        //Validar formato ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "ID no válido"
            });
        }
        //Buscar en BD
        const estudiante = await Estudiante.findById(id);
        if (!estudiante) {
            return res.status(404).json({
                error: "Estudiante no encontrado"
            });
        }
        //Respuesta exitosa
        res.json({
            estudiante
        });
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
    obtenerEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};