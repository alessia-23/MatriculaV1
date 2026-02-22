import express from "express";
import {crearEstudiante,obtenerEstudiantes,buscarEstudiante,actualizarEstudiante,eliminarEstudiante} from "../controllers/estudianteController.js";
import protegerRuta from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/crear", protegerRuta, crearEstudiante);
router.get("/listar", protegerRuta, obtenerEstudiantes);
router.get("/buscar", protegerRuta, buscarEstudiante);
router.put("/actualizar/:id", protegerRuta, actualizarEstudiante);
router.delete("/eliminar/:id", protegerRuta, eliminarEstudiante);

export default router;