import { getDB } from "../database/database.js";
import bcrypt from "bcrypt";

/**
 * Nombre de la colección de MongoDB que almacena los documentos de usuario.
 * @constant {string}
 */
const COLLECTION = "usuarios";

/**
 * @typedef {Object} UsuarioDB
 * @property {string} nombre
 * @property {string} email
 * @property {string} password  Contraseña hasheada con bcrypt.
 */

/**
 * Recupera y devuelve todos los documentos de usuario de la colección.
 * (Incluyen el campo password hasheado, por ser datos internos de la capa de modelo.)
 * @async
 * @returns {Promise<UsuarioDB[]>}
 */
export async function getAllUsuarios() {
  const db = await getDB();
  return db.collection(COLLECTION).find().toArray();
}

/**
 * Busca y devuelve un único usuario basándose en su dirección de correo electrónico.
 * @async
 * @param {string} email - El email del usuario a buscar.
 * @returns {Promise<UsuarioDB | null>}
 */
export async function getUsuarioByEmail(email) {
  const db = await getDB();
  return db.collection(COLLECTION).findOne({ email });
}

/**
 * Inserta un nuevo documento de usuario en la colección.
 * @async
 * @param {{nombre: string, email: string, password: string}} data
 * @returns {Promise<{id: string, nombre: string, email: string}>}
 */
export async function createUsuario(data) {
  const db = await getDB();

  const hashed = await bcrypt.hash(data.password, 10);

  const userToInsert = {
    nombre: data.nombre,
    email: data.email,
    password: hashed
  };

  const result = await db.collection(COLLECTION).insertOne(userToInsert);

  return {
    id: result.insertedId.toString(),
    nombre: data.nombre,
    email: data.email
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
 * @async
 * @param {number} index - El índice (posición) del usuario a eliminar.
 * @returns {Promise<boolean>} `true` si el usuario fue eliminado, `false` si el índice está fuera de rango.
 */
export async function deleteUsuarioByIndex(index) {
  const usuarios = await getAllUsuarios();

  if (index < 0 || index >= usuarios.length) return false;

  const user = usuarios[index];

  const db = await getDB();
  await db.collection(COLLECTION).deleteOne({ email: user.email });

  return true;
}
