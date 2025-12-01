import {getAllVoluntariados, 
        getVoluntariadoById,
        createVoluntariado,
        updateVoluntariado,
        deleteVoluntariado
} from "../models/voluntariado.model.js";

export async function listarVoluntariados(req, res) {
    try {
        const lista = await getAllVoluntariados();
        res.json(lista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener voluntariados" });
    }
}

export async function obtenerVoluntariado(req, res) {
    try {
        const id = req.params.id;
        const voluntariado = await getVoluntariadoById(id);

        if (!voluntariado) {
            return res.status(404).json({ mensaje: "Voluntariado no encontrado" });
        }

        res.json(voluntariado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener voluntariado" });
    }
}

export async function crearVoluntariado(req, res) {
    try {
        const nuevo = await createVoluntariado(req.body);
        res.json({
            mensaje: "Voluntariado creado",
            voluntariado: nuevo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear voluntariado" });
    }
}

export async function actualizarVoluntariado(req, res) {
    try {
        const id = req.params.id;
        const cambios = req.body;

        const voluntariado = await getVoluntariadoById(id);
        if (!voluntariado) {
            return res.status(404).json({ mensaje: "Voluntariado no encontrado" });
        }

        await updateVoluntariado(id, cambios);

        res.json({
            mensaje: "Voluntariado actualizado",
            id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al actualizar voluntariado" });
    }
}

export async function eliminarVoluntariado(req, res) {
    try {
        const id = req.params.id;

        const voluntariado = await getVoluntariadoById(id);
        if (!voluntariado) {
            return res.status(404).json({ mensaje: "Voluntariado no encontrado" });
        }

        await deleteVoluntariado(id);

        res.json({
            mensaje: "Voluntariado eliminado",
            id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar voluntariado" });
    }
}