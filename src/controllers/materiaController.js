import Materia from "../models/Materia.js";
import mongoose from "mongoose";

// CREAR MATERIA
const crearMateria = async (req, res) => {
    try {
        const { nombre, codigo, descripcion, creditos } = req.body;
        if (!nombre || !codigo || !creditos) {
            return res.status(400).json({
                msg: "Los campos obligatorios no están completos"
            });
        }
        const existeMateria = await Materia.findOne({ codigo });
        if (existeMateria) {
            return res.status(400).json({
                msg: "La materia ya está registrada"
            });
        }
        const materia = new Materia({nombre,codigo,descripcion,creditos});
        await materia.save();
        res.status(201).json({
            msg: "Materia creada correctamente",
            materia
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error del servidor al crear materia"
        });
    }
};

// OBTENER TODAS
const obtenerMaterias = async (req, res) => {
    try {
        const materias = await Materia.find();
        res.json(materias);
    } catch (error) {
        res.status(500).json({
            msg: "Error del servidor al obtener materias"
        });
    }
};

// OBTENER POR ID
const obtenerMateria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "ID no válido"
            });
        }
        const materia = await Materia.findById(id);
        if (!materia) {
            return res.status(404).json({
                msg: "Materia no encontrada"
            });
        }
        res.json(materia);
    } catch (error) {
        res.status(500).json({
            msg: "Error del servidor al obtener materia"
        });
    }
};

// ACTUALIZAR
const actualizarMateria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "ID no válido"
            });
        }
        const materia = await Materia.findById(id);
        if (!materia) {
            return res.status(404).json({
                msg: "Materia no encontrada"
            });
        }
        Object.assign(materia, req.body);
        await materia.save();
        res.json({
            msg: "Materia actualizada correctamente",
            materia
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error del servidor al actualizar materia"
        });
    }
};

// ELIMINAR
const eliminarMateria = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "ID no válido"
            });
        }
        const materia = await Materia.findByIdAndDelete(id);
        if (!materia) {
            return res.status(404).json({
                msg: "Materia no encontrada"
            });
        }
        res.json({
            msg: "Materia eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error del servidor al eliminar materia"
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