/**
 * @module usuario
 * Módulo que gestiona la lista de usuarios y el estado del usuario activo.
 * Proporciona funciones para manipular usuarios y sesiones.
 */

/**
 * @typedef {Object} Usuario
 * @property {string} nombre - El nombre del usuario.
 * @property {string} email - La dirección de correo electrónico del usuario.
 * @property {string} password - La contraseña del usuario.
 */

/**
 * Lista de todos los usuarios registrados en el sistema.
 * Contiene objetos que siguen la estructura definida en {@link Usuario}.
 * 
 * @type {Usuario[]}
 */
export let usuarios = [
    {
        nombre: "Admin",
        email: "admin@mail.com",
        password: "1234"
    }
];

/**
 * Nombre del usuario que está actualmente logueado.
 * Si no hay ningún usuario activo, su valor es `null`.
 * 
 * @type {?string}
 */
export let usuarioActivo = null;

/**
 * Reemplaza la lista actual de usuarios con una nueva lista.
 * 
 * @param {Usuario[]} nuevos - La nueva lista de usuarios que se desea establecer.
 * @returns {void}
 */
export function setUsuarios(nuevos){
    usuarios = nuevos;
}

/**
 * Establece el nombre del usuario actualmente activo (logueado).
 * 
 * @param {string} nombre - El nombre del usuario que ha iniciado sesión.
 * @returns {void}
 */
export function setUsuarioActivo(nombre){
    usuarioActivo = nombre;
}