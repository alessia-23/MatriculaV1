import express from "express";
import {crearMateria,obtenerMaterias,buscarMateria,actualizarMateria,eliminarMateria} from "../controllers/materiaController.js";

import protegerRuta from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/crear", protegerRuta, crearMateria);
router.get("/listar", protegerRuta, obtenerMaterias);
router.get("/buscarMateria", protegerRuta, buscarMateria);
router.put("/actualizar/:id", protegerRuta, actualizarMateria);
router.delete("/eliminar/:id", protegerRuta, eliminarMateria);

export default router;