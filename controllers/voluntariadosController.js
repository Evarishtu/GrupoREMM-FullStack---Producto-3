import {voluntariados, setVoluntariados } from "../data/voluntariados.js";

export const getVoluntariados = (req, res) => {
    res.json(voluntariados);
};
export const crearVoluntariado = (req, res) =>{
    const nuevo = req.body;

    nuevo.id = voluntariados.length > 0
        ? voluntariados[voluntariados.length - 1].id + 1 
        : 1;

    voluntariados.push(nuevo);

    res.json({
        mensaje: "Voluntariado creado correctamente",
        voluntariado: nuevo
    });
};

export const updateVoluntariado = (req, res) => {
    const id = Number(req.params.id);
    const datosActualizados = req.body;

    const voluntariado = voluntariados.find(v => v.id === id);
    
    if(!voluntariado){
        return res.status(404).json({
            mensaje: "Voluntariado no encontrado",
            id
        });
    }
    Object.assign(voluntariado, datosActualizados);

    res.json({
        mensaje: "Voluntariado actualizado correctamente",
        voluntariado
    });
};

export const eliminarVoluntariado = (req, res) => {
    const id = Number(req.params.id);

    const voluntariado = voluntariados.filter(v => v.id !== id);

    if(!voluntariado){
        return res.status(404).json({
            mensaje: "Voluntariado no encontrado",
            id
        });
    }

    const filtrados = voluntariados.filter(v => v.id !== id);
    setVoluntariados(filtrados);

    res.json({
        mensake: "Voluntariado eliminado correctamente",
        id
    });
};