import { Router } from "express";

import {
    listarVoluntariados,
    obtenerVoluntariado,
    crearVoluntariado,
    actualizarVoluntariado,
    eliminarVoluntariado
} from "../controllers/voluntariadosController.js";

const router = Router();

router.get("/", listarVoluntariados);
router.get("/:id", obtenerVoluntariado);
router.post("/", crearVoluntariado);
router.put("/:id", actualizarVoluntariado);
router.delete("/:id", eliminarVoluntariado);

export default router;


