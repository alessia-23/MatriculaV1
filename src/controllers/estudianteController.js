import Estudiante from "../models/Estudiante.js";

// CREAR ESTUDIANTE
const crearEstudiante = async (req, res) => {
    try {
        const {nombre,
            apellido,
            cedula,
            fecha_nacimiento,
            ciudad,
            direccion,
            telefono,
            email
        } = req.body;

        if (!nombre || !apellido || !cedula || !fecha_nacimiento || !direccion || !email) {
            return res.status(400).json({ msg: "Campos obligatorios incompletos" });
        }

        const existeEstudiante = await Estudiante.findOne({ cedula });

        if (existeEstudiante) {
            return res.status(400).json({ msg: "La cédula ya está registrada" });
        }

        const estudiante = new Estudiante(req.body);
        await estudiante.save();

        res.status(201).json({
            msg: "Estudiante creado correctamente",
            estudiante
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error del servidor" });
    }
};


// OBTENER TODOS
const obtenerEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ msg: "Error del servidor" });
    }
};


// OBTENER POR ID
const obtenerEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findById(req.params.id);
        if (!estudiante) {
            return res.status(404).json({ msg: "Estudiante no encontrado" });
        }
        res.json(estudiante);
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ msg: "ID no válido" });
        }
        res.status(500).json({ msg: "Error del servidor" });
    }
};


// ACTUALIZAR
const actualizarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!estudiante) {
            return res.status(404).json({ msg: "Estudiante no encontrado" });
        }
        res.json({
            msg: "Estudiante actualizado",
            estudiante
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ msg: "ID no válido" });
        }
        res.status(500).json({ msg: "Error del servidor" });
    }
};


// ELIMINAR
const eliminarEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
        if (!estudiante) {
            return res.status(404).json({ msg: "Estudiante no encontrado" });
        }
        res.json({ msg: "Estudiante eliminado" });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ msg: "ID no válido" });
        }
        res.status(500).json({ msg: "Error del servidor" });
    }
};

export {
    crearEstudiante,
    obtenerEstudiantes,
    obtenerEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
};