import Materia from "../models/Materia.js";
import mongoose from "mongoose";

// CREAR MATERIA
const crearMateria = async (req, res) => {
    try {
        const { nombre, codigo, descripcion, creditos } = req.body;
        if (!nombre || !codigo || !descripcion || !creditos) {
            return res.status(400).json({
                error: "Campos obligatorios incompletos"
            });
        }
        const existeMateria = await Materia.findOne({ codigo });
        if (existeMateria) {
            return res.status(400).json({
                error: "La materia ya está registrada"
            });
        }
        const materia = new Materia({nombre,codigo,descripcion,creditos});
        await materia.save();
        res.status(201).json({
            message: "Materia creada correctamente",
            materia
        });
    } catch (error) {
        res.status(500).json({
            error: "Error del servidor"
        });
    }
};

// OBTENER TODAS
const obtenerMaterias = async (req, res) => {
    try {
        const materias = await Materia.find();
        res.json({materias});
    } catch (error) {
        res.status(500).json({
            error: "Error del servidor"
        });
    }
};

// OBTENER POR ID
const obtenerMateria = async (req, res) => {
    try {
        const { id } = req.params;
        // Validar formato ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "ID no válido"
            });
        }
        const materia = await Materia.findById(id);
        if (!materia) {
            return res.status(404).json({
                error: "Materia no encontrada"
            });
        }
        res.json({materia});
    } catch (error) {
        res.status(500).json({
            error: "Error del servidor"
        });
    }
};

// ACTUALIZAR
const actualizarMateria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "ID no válido"
            });
        }
        const materia = await Materia.findById(id);
        if (!materia) {
            return res.status(404).json({
                error: "Materia no encontrada"
            });
        }
        Object.assign(materia, req.body);
        await materia.save();
        res.json({
            message: "Materia actualizada correctamente",materia
        });
    } catch (error) {
        res.status(500).json({error: "Error del servidor"});
    }
};

// ELIMINAR
const eliminarMateria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                error: "ID no válido"
            });
        }
        const materia = await Materia.findByIdAndDelete(id);
        if (!materia) {
            return res.status(404).json({
                error: "Materia no encontrada"
            });
        }
        res.json({
            message: "Materia eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            error: "Error del servidor"
        });
    }
};

export {
    crearMateria,
    obtenerMaterias,
    obtenerMateria,
    actualizarMateria,
    eliminarMateria
};