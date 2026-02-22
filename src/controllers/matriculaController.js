import Matricula from "../models/Matricula.js";
import Estudiante from "../models/Estudiante.js";
import Materia from "../models/Materia.js";
import mongoose from "mongoose";

// CREAR MATRÍCULA
const crearMatricula = async (req, res) => {
    try {
        const { codigo, descripcion, estudiante, materia } = req.body;
        // Validar campos obligatorios
        if (!codigo || !estudiante || !materia) {
            return res.status(400).json({
                msg: "Los campos obligatorios no están completos"
            });
        }
        // Validar formato ObjectId
        if (
            !mongoose.Types.ObjectId.isValid(estudiante) ||
            !mongoose.Types.ObjectId.isValid(materia)
        ) {
            return res.status(400).json({
                msg: "ID de estudiante o materia no válido"
            });
        }
        // Verificar existencia en BD
        const [existeEstudiante, existeMateria] = await Promise.all([
            Estudiante.findById(estudiante),
            Materia.findById(materia)
        ]);
        if (!existeEstudiante || !existeMateria) {
            return res.status(404).json({
                msg: "Estudiante o materia no encontrados"
            });
        }
        // Verificar duplicado
        const yaMatriculado = await Matricula.findOne({estudiante,materia});
        if (yaMatriculado) {
            return res.status(400).json({
                msg: "El estudiante ya está matriculado en esta materia"
            });
        }
        const matricula = await Matricula.create({codigo,descripcion,estudiante,materia});
        res.status(201).json({
            msg: "Matrícula creada correctamente",matricula
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                msg: error.message
            });
        }
        res.status(500).json({
            msg: "Error del servidor al crear matrícula"
        });
    }
};

// OBTENER TODAS LAS MATRÍCULAS
const obtenerMatriculas = async (req, res) => {
    try {
        const matriculas = await Matricula.find()
            .populate("estudiante", "nombre apellido cedula")
            .populate("materia", "nombre codigo creditos");
        res.json(matriculas);
    } catch (error) {
        res.status(500).json({
            msg: "Error del servidor al obtener matrículas"
        });
    }
};


// OBTENER MATRÍCULA POR ID
const obtenerMatricula = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "ID no válido"
            });
        }
        const matricula = await Matricula.findById(id)
            .populate("estudiante", "nombre apellido")
            .populate("materia", "nombre codigo");
        if (!matricula) {
            return res.status(404).json({
                msg: "Matrícula no encontrada"
            });
        }
        res.json(matricula);
    } catch (error) {
        res.status(500).json({
            msg: "Error del servidor"
        });
    }
};

// ACTUALIZAR MATRÍCULA
const actualizarMatricula = async (req, res) => {
    try {
        const { id } = req.params;
        const { codigo, descripcion, estudiante, materia } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "ID no válido"
            });
        }
        const matricula = await Matricula.findById(id);
        if (!matricula) {
            return res.status(404).json({
                msg: "Matrícula no encontrada"
            });
        }
        // Validar estudiante si viene
        if (estudiante) {
            if (!mongoose.Types.ObjectId.isValid(estudiante)) {
                return res.status(400).json({
                    msg: "ID de estudiante no válido"
                });
            }
            const existeEstudiante = await Estudiante.findById(estudiante);
            if (!existeEstudiante) {
                return res.status(404).json({
                    msg: "Estudiante no encontrado"
                });
            }
            matricula.estudiante = estudiante;
        }
        // Validar materia si viene
        if (materia) {
            if (!mongoose.Types.ObjectId.isValid(materia)) {
                return res.status(400).json({
                    msg: "ID de materia no válido"
                });
            }
            const existeMateria = await Materia.findById(materia);
            if (!existeMateria) {
                return res.status(404).json({
                    msg: "Materia no encontrada"
                });
            }
            matricula.materia = materia;
        }
        // Validar duplicado después del cambio
        const yaMatriculado = await Matricula.findOne({
            estudiante: matricula.estudiante,
            materia: matricula.materia,
            _id: { $ne: id }
        });
        if (yaMatriculado) {
            return res.status(400).json({
                msg: "Ya existe una matrícula con este estudiante y materia"
            });
        }
        if (codigo) matricula.codigo = codigo;
        if (descripcion) matricula.descripcion = descripcion;
        await matricula.save();
        res.json({
            msg: "Matrícula actualizada correctamente",
            matricula
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error del servidor al actualizar matrícula"
        });
    }
};

// ELIMINAR MATRÍCULA
const eliminarMatricula = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: "ID no válido"
            });
        }
        const matricula = await Matricula.findByIdAndDelete(id);
        if (!matricula) {
            return res.status(404).json({
                msg: "Matrícula no encontrada"
            });
        }
        res.json({
            msg: "Matrícula eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error del servidor"
        });
    }
};

export{
    crearMatricula,
    obtenerMatriculas,  
    actualizarMatricula,
    obtenerMatricula,    
    eliminarMatricula
}