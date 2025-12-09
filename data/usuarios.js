/**
 * @module usuarios
 * Datos de ejemplo de usuarios en memoria.
 * En MongoDB se usan modelos reales y contraseñas hasheadas.
 */

/**
 * @typedef {Object} Usuario
 * @property {string} nombre - Nombre del usuario.
 * @property {string} email - Dirección de correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario (solo para entorno de desarrollo o pruebas).
 */

/**
 * Lista inicial de usuarios de ejemplo en memoria.
 * En la versión con MongoDB, los usuarios reales se insertan en la base de datos
 * con la contraseña hasheada mediante bcrypt.
 *
 * @type {Usuario[]}
 */
export let usuarios = [
  {
    nombre: "Admin",
    email: "admin@mail.com",
    password: "1234" // Solo como dato de ejemplo histórico
  }
];

/**
 * Reemplaza completamente la lista actual de usuarios en memoria.
 * Esta funcionalidad solo se utiliza en versiones sin base de datos.
 *
 * @param {Usuario[]} nuevosUsuarios - Nueva lista de usuarios en memoria.
 * @returns {void}
 */
export function setUsuarios(nuevosUsuarios) {
  if (!Array.isArray(nuevosUsuarios)) {
    throw new TypeError("setUsuarios espera un array de usuarios");
  }

  usuarios = nuevosUsuarios;
}
