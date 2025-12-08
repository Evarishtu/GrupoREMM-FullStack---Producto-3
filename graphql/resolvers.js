/**
 * @module resolvers
 * Contiene todos los resolvers (Queries y Mutations) para la API GraphQL del sistema de voluntariados.
 */

/**
 * Importa funciones del modelo de usuarios.
 * @external {getAllUsuarios} "../models/usuario.model.js"
 * @external {getUsuarioByEmail} "../models/usuario.model.js"
 * @external {createUsuario} "../models/usuario.model.js"
 * @external {deleteUsuarioByEmail} "../models/usuario.model.js"
 * @external {deleteUsuarioByIndex} "../models/usuario.model.js"
 * @external {getUsuarioActivo} "../models/usuario.model.js"
 * @external {setUsuarioActivo} "../models/usuario.model.js"
 * @external {limpiarUsuarioActivo} "../models/usuario.model.js"
 */
import {getAllUsuarios, 
        getUsuarioByEmail, 
        createUsuario, 
        deleteUsuarioByEmail,
        deleteUsuarioByIndex,
        getUsuarioActivo,
        setUsuarioActivo,
        limpiarUsuarioActivo
} from "../models/usuario.model.js";

/**
 * Importa funciones del modelo de voluntariados.
 * @external {getAllVoluntariados} "../models/voluntariado.model.js"
 * @external {getVoluntariadoById} "../models/voluntariado.model.js"
 * @external {createVoluntariado} "../models/voluntariado.model.js"
 * @external {updateVoluntariado} "../models/voluntariado.model.js"
 * @external {deleteVoluntariado} "../models/voluntariado.model.js"
 * @external {updateVoluntariadoByIndex} "../models/voluntariado.model.js"
 * @external {deleteVoluntariadoByIndex} "../models/voluntariado.model.js"
 */
import {getAllVoluntariados,
        getVoluntariadoById,
        createVoluntariado,
        updateVoluntariado,
        deleteVoluntariado,
        updateVoluntariadoByIndex,
        deleteVoluntariadoByIndex
} from "../models/voluntariado.model.js";

/**
 * Objeto principal que contiene todos los resolvers para Queries y Mutations de GraphQL.
 * 
 * @type {Object}
 * @property {function(): Promise<import('../models/usuario.model.js').Usuario[]>} usuarios - Obtiene todos los usuarios.
 * @property {function({email: string}): Promise<import('../models/usuario.model.js').Usuario | null>} usuarioPorEmail - Obtiene usuario por email.
 * @property {function(): import('../models/usuario.model.js').Usuario | null} usuarioActivo - Usuario actualmente logueado.
 * @property {function(): Promise<import('../models/voluntariado.model.js').Voluntariado[]>} voluntariados - Obtiene todos los voluntariados.
 * @property {function({id: number}): Promise<import('../models/voluntariado.model.js').Voluntariado | null>} voluntariadoPorId - Obtiene voluntariado por ID.
 */
export const root = {
     // Queries (Consultas de Lectura)
  
    /**
     * Obtiene la lista completa de todos los usuarios registrados.
     * @async
     * @returns {Promise<import('../models/usuario.model.js').Usuario[]>}
     */
    usuarios: async () => {
        return await getAllUsuarios();
    },
     /**
     * Busca un usuario específico por su dirección de correo electrónico.
     * @async
     * @param {{email: string}} args - Contiene el email del usuario a buscar.
     * @returns {Promise<import('../models/usuario.model.js').Usuario | null>}
     */
    usuarioPorEmail: async ({email}) => {
        return await getUsuarioByEmail(email);
    },
    /**
     * Devuelve el usuario actualmente activo (logueado).
     * @returns {import('../models/usuario.model.js').Usuario | null}
     */
    usuarioActivo: () => {
        return getUsuarioActivo();
    },
    /**
     * Obtiene la lista completa de todos los voluntariados disponibles.
     * @async
     * @returns {Promise<import('../models/voluntariado.model.js').Voluntariado[]>}
     */
    voluntariados: async () => {
        return await getAllVoluntariados();
    },
    /**
     * Busca un voluntariado específico por su ID único.
     * @async
     * @param {{id: number}} args - Contiene el ID del voluntariado a buscar.
     * @returns {Promise<import('../models/voluntariado.model.js').Voluntariado | null>}
     */
    voluntariadoPorId: async ({id}) => {
        return await getVoluntariadoById(id);
    },

    // Mutations (Operaciones de Escritura)

    /**
     * Crea un nuevo usuario en el sistema.
     * @async
     * @param {Object} args - Datos del nuevo usuario.
     * @param {string} args.nombre - Nombre completo del usuario.
     * @param {string} args.email - Email único del usuario.
     * @param {string} args.password - Contraseña del usuario.
     * @returns {Promise<import('../models/usuario.model.js').Usuario>}
     */
    crearUsuario: async ({nombre, email, password}) => {
        return await createUsuario({nombre, email, password});
    },
    /**
     * Elimina un usuario por su dirección de correo electrónico.
     * @async
     * @param {{email: string}} args - Email del usuario a eliminar.
     * @returns {Promise<string>} Mensaje de confirmación.
     */
    borrarUsuarioPorEmail: async ({email}) => {
        await deleteUsuarioByEmail(email);
        return "Usuario eliminado";
    },
    /**
     * Elimina un usuario por su posición en el array de usuarios.
     * @async
     * @param {{indice: number}} args - Índice del usuario en el array.
     * @returns {Promise<string>} Mensaje de éxito o error.
     */
    borrarUsuarioPorIndice: async ({indice}) => {
        const ok = await deleteUsuarioByIndex(indice);
        return ok ? "Usuario eliminado por índice" : "Índice fuera de rango";
    },
    /**
     * Cierra la sesión del usuario activo.
     * @returns {string} Mensaje de confirmación.
     */
    limpiarUsuarioActivo: () => {
        limpiarUsuarioActivo();
        return "Sesión cerrada";
    },
    /**
     * Inicia sesión validando credenciales y establece usuario activo.
     * @async
     * @param {Object} args - Credenciales de login.
     * @param {string} args.email - Email del usuario.
     * @param {string} args.password - Contraseña.
     * @returns {Promise<import('../models/usuario.model.js').Usuario | null>}
     */
    login: async ({email, password}) => {
        const user = await getUsuarioByEmail(email);

        if(!user || user.password !== password){
            return null;
        }
        setUsuarioActivo(user);
        return user;
    },
    /**
     * Crea un nuevo voluntariado validando el tipo.
     * @async
     * @param {Object} args - Datos del nuevo voluntariado.
     * @param {string} args.titulo - Título descriptivo.
     * @param {string} args.usuario - Nombre del usuario publicante.
     * @param {string} args.fecha - Fecha en formato YYYY-MM-DD.
     * @param {string} args.descripcion - Descripción detallada.
     * @param {'PETICION'|'OFERTA'} args.tipo - Tipo de voluntariado.
     * @returns {Promise<import('../models/voluntariado.model.js').Voluntariado>}
     * @throws {Error} Si el tipo no es válido.
     */
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
    /**
     * Actualiza un voluntariado por su ID validando el tipo.
     * @async
     * @param {Object} args - Datos de actualización.
     * @param {number} args.id - ID del voluntariado.
     * @param {Object} args.cambios - Campos a modificar.
     * @returns {Promise<string>} Mensaje de confirmación.
     * @throws {Error} Si el tipo es inválido.
     */
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
    /**
     * Actualiza un voluntariado por su índice en el array.
     * @async
     * @param {Object} args - Datos de actualización.
     * @param {number} args.indice - Índice en el array.
     * @param {Object} args.cambios - Campos a modificar.
     * @returns {Promise<string>} Mensaje de éxito o error.
     */
     actualizarVoluntariadoPorIndice: async ({indice, ...cambios}) => {
        const ok = await updateVoluntariadoByIndex(indice, cambios);

        return ok ? "Voluntariado actualizado por índice" : "Índice fuera de rango";
    },
    /**
     * Elimina un voluntariado por su ID.
     * @async
     * @param {{id: number}} args - ID del voluntariado a eliminar.
     * @returns {Promise<string>} Mensaje de confirmación.
     */
    eliminarVoluntariado: async ({id}) => {
        await deleteVoluntariado(id);
        return "Voluntariado eliminado";
    },
    /**
     * Elimina un voluntariado por su índice en el array.
     * @async
     * @param {{indice: number}} args - Índice del voluntariado.
     * @returns {Promise<string>} Mensaje de éxito o error.
     */
    eliminarVoluntariadoPorIndice: async ({indice}) => {
        const ok = await deleteVoluntariadoByIndex(indice);
        return ok ? "Voluntariado eliminado por índice" : "Índice fuera de rango";
    },
};
