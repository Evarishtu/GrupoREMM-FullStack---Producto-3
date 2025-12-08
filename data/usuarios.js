/**
 * @module usuario
 * Módulo con datos de ejemplo de usuarios usado en versiones anteriores en memoria.
 * En la versión actual del backend, los usuarios se gestionan en MongoDB
 * mediante los modelos y nunca se almacenan contraseñas en texto plano.
 */

/**
 * @typedef {Object} Usuario
 * @property {string} nombre - El nombre del usuario.
 * @property {string} email - La dirección de correo electrónico del usuario.
 * @property {string} password - La contraseña del usuario (solo para ejemplos locales, no en producción).
 */

/**
 * Lista inicial de usuarios de ejemplo.
 * En la versión con MongoDB, los usuarios reales se insertan en la base de datos
 * con la contraseña hasheada mediante bcrypt.
 *
 * @type {Usuario[]}
 */
export let usuarios = [
  {
    nombre: "Admin",
    email: "admin@mail.com",
    password: "1234" // solo como dato de ejemplo histórico
  }
];

/**
 * Reemplaza la lista actual de usuarios en memoria.
 * Esta funcionalidad solo se usa en versiones sin base de datos.
 *
 * @param {Usuario[]} nuevos
 * @returns {void}
 */
export function setUsuarios(nuevos) {
  usuarios = nuevos;
}
