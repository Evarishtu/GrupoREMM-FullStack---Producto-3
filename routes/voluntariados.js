import { Router } from "express";

import {
    getVoluntariados,
    crearVoluntariado,
    updateVoluntariado,
    eliminarVoluntariado
} from "../controllers/voluntariadosController.js";

const router = Router();

router.get("/", getVoluntariados);
router.post("/", crearVoluntariado);
router.put("/:id", updateVoluntariado);
router.delete("/:id", eliminarVoluntariado);

export default router;


