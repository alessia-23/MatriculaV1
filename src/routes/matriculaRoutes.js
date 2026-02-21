import express from "express";
import { crearMatricula, obtenerMatriculas, obtenerMatricula, actualizarMatricula, eliminarMatricula } from "../controllers/matriculaController.js";

import protegerRuta from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/crear", protegerRuta, crearMatricula);
router.get("/listar", protegerRuta, obtenerMatriculas);
router.get("/detalle/:id", protegerRuta, obtenerMatricula);
router.put("/actualizar/:id", protegerRuta, actualizarMatricula);
router.delete("/eliminar/:id", protegerRuta, eliminarMatricula);

export default router;