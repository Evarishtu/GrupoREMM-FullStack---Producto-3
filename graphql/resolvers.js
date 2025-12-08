import {getAllUsuarios, 
        getUsuarioByEmail, 
        createUsuario, 
        deleteUsuarioByEmail,
        deleteUsuarioByIndex,
        getUsuarioActivo,
        setUsuarioActivo,
        limpiarUsuarioActivo
} from "../models/usuario.model.js";

import {getAllVoluntariados,
        getVoluntariadoById,
        createVoluntariado,
        updateVoluntariado,
        deleteVoluntariado,
        updateVoluntariadoByIndex,
        deleteVoluntariadoByIndex
} from "../models/voluntariado.model.js";

export const root = {
    // Queries
    usuarios: async () => {
        return await getAllUsuarios();
    },
    usuarioPorEmail: async ({email}) => {
        return await getUsuarioByEmail(email);
    },
    usuarioActivo: () => {
        return getUsuarioActivo();
    },
    voluntariados: async () => {
        return await getAllVoluntariados();
    },
    voluntariadoPorId: async ({id}) => {
        return await getVoluntariadoById(id);
    },
    // Mutations

    crearUsuario: async ({nombre, email, password}) => {
        return await createUsuario({nombre, email, password});
    },
    borrarUsuarioPorEmail: async ({email}) => {
        await deleteUsuarioByEmail(email);
        return "Usuario eliminado";
    },
    borrarUsuarioPorIndice: async ({indice}) => {
        const ok = await deleteUsuarioByIndex(indice);
        return ok ? "Usuario eliminado por índice" : "Índice fuera de rango";
    },

    limpiarUsuarioActivo: () => {
        limpiarUsuarioActivo();
        return "Sesión cerrada";
    },
    login: async ({email, password}) => {
        const user = await getUsuarioByEmail(email);

        if(!user || user.password !== password){
            return null;
        }
        setUsuarioActivo(user);
        return user;
    },
    crearVoluntariado: async ({titulo, usuario, fecha, descripcion, tipo}) => {
        const tipoValido = ["PETICION", "OFERTA"];
        if(!tipoValido.includes(tipo)){
            throw new Error("El tipo de voluntariado debe ser PETICION u OFERTA")
        }
        return await createVoluntariado({
            titulo,
            usuario,
            fecha,
            descripcion,
            tipo
        });
    },
    actualizarVoluntariado: async ({id, ...cambios}) => {
        if (cambios.tipo){
            const tipoValido = ["PETICION", "OFERTA"];
            if(!tipoValido.includes(cambios.tipo)){
                throw new Error("El tipo de voluntariado debe ser PETICION u OFERTA");
            }
        }
        await updateVoluntariado(id, cambios);
        return "Voluntariado actualizado";
    },
     actualizarVoluntariadoPorIndice: async ({indice, ...cambios}) => {
        const ok = await updateVoluntariadoByIndex(indice, cambios);

        return ok ? "Voluntariado actualizado por índice" : "Índice fuera de rango";
    },
    eliminarVoluntariado: async ({id}) => {
        await deleteVoluntariado(id);
        return "Voluntariado eliminado";
    },
    eliminarVoluntariadoPorIndice: async ({indice}) => {
        const ok = await deleteVoluntariadoByIndex(indice);
        return ok ? "Voluntariado eliminado por índice" : "Índice fuera de rango";
    },
};
