import { ObjectId } from "mongodb";
import { getDB } from "../database/database.js";

/**
 * Nombre de la colección de MongoDB que almacena los documentos de usuario.
 * @constant {string}
 */
const COLLECTION = "usuarios";

/**
 * Recupera y devuelve todos los documentos de usuario de la colección.
 * @async
 * @returns {Promise<Usuario[]>} Una promesa que resuelve con un array de objetos Usuario.
 */
export async function getAllUsuarios() {
    const db = await getDB();
    return db.collection(COLLECTION).find().toArray();
}

/**
 * Busca y devuelve un único usuario basándose en su dirección de correo electrónico.
 * @async
 * @param {string} email - El email del usuario a buscar.
 * @returns {Promise<Usuario | null>} Una promesa que resuelve con el objeto Usuario, o null si no se encuentra.
 */
export async function getUsuarioByEmail(email) {
    const db = await getDB();
    return db.collection(COLLECTION).findOne({ email });
}

/**
 * Inserta un nuevo documento de usuario en la colección.
 * @async
 * @param {Omit<Usuario, '_id'>} data - Objeto con los datos del nuevo usuario (nombre, email, password).
 * @returns {Promise<Usuario>} Una promesa que resuelve con el objeto del usuario insertado, incluyendo el ID.
 */
export async function createUsuario(data) {
    const db = await getDB();
    const result = await db.collection(COLLECTION).insertOne(data);

    return {
        id: result.insertedId,
        ...data
    };
}

/**
 * Elimina un único usuario de la colección basándose en su dirección de correo electrónico.
 * @async
 * @param {string} email - El email del usuario a eliminar.
 * @returns {Promise<void>}
 */
export async function deleteUsuarioByEmail(email) {
    const db = await getDB();
    await db.collection(COLLECTION).deleteOne({ email });
}

/**
 * Elimina un usuario basándose en su posición (índice) en el array devuelto por getAllUsuarios().
 * Esta función es menos eficiente y se utiliza a menudo para simular operaciones de array en la API.
 * @async
 * @param {number} index - El índice (posición) del usuario a eliminar.
 * @returns {Promise<boolean>} Devuelve `true` si el usuario fue eliminado, `false` si el índice está fuera de rango.
 */
export async function deleteUsuarioByIndex(index) {
    const usuarios = await getAllUsuarios();

    if (index < 0 || index >= usuarios.length)
        return false;

    const user = usuarios[index];

    const db = await getDB();
    // Usa el email del usuario obtenido por índice para la eliminación segura.
    await db.collection(COLLECTION).deleteOne({ email: user.email });

    return true;
}

/**
 * Variable local que almacena el objeto del usuario actualmente logueado.
 * Mantiene el estado de la sesión en memoria.
 * @type {Usuario | null}
 */
let usuarioActivo = null;
/**
 * Devuelve el usuario actualmente activo.
 * @returns {Usuario | null} El objeto del usuario si está logueado, o `null`.
 */
export function getUsuarioActivo() {
    return usuarioActivo;
}

/**
 * Establece el usuario como activo después de un login exitoso.
 * @param {Usuario} user - El objeto del usuario que ha iniciado sesión.
 */
export function setUsuarioActivo(user) {
    usuarioActivo = user;
}

/**
 * Cierra la sesión del usuario activo estableciendo `usuarioActivo` a `null`.
 */
export function limpiarUsuarioActivo() {
    usuarioActivo = null;
}