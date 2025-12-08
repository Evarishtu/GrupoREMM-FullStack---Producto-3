import {ObjectId} from "mongodb";
import {getDB} from "../database/database.js";

/**
 * Nombre de la colección de MongoDB que almacena los documentos de voluntariado.
 * @constant {string}
 */
const COLLECTION = "voluntariados";

/**
 * @typedef {Object} VoluntariadoDB
 * Define la estructura de un documento de voluntariado tal como se almacena en MongoDB.
 * @property {ObjectId} _id - El identificador único generado por MongoDB.
 * @property {string} titulo - Título de la publicación.
 * @property {string} usuario - Usuario que publica.
 * @property {string} fecha - Fecha de la publicación.
 * @property {string} descripcion - Descripción.
 * @property {('PETICION'|'OFERTA')} tipo - Tipo de voluntariado.
 */

/**
 * Convierte un documento de MongoDB (con `_id: ObjectId`) en un objeto apto para la API
 * (con `id: string`).
 * @param {VoluntariadoDB} v - El documento de voluntariado de MongoDB.
 * @returns {Voluntariado} El objeto de voluntariado mapeado.
 */
function mapVoluntariado(v){
    return{
        id: v._id.toString(),
        titulo: v.titulo,
        usuario: v.usuario,
        fecha: v.fecha,
        descripcion: v.descripcion,
        tipo: v.tipo
    };
}

/**
 * Recupera y devuelve todos los documentos de voluntariado, mapeándolos para la API.
 * @async
 * @returns {Promise<Voluntariado[]>} Una promesa que resuelve con un array de objetos Voluntariado.
 */
export async function getAllVoluntariados(){
    const db = await getDB();
    const lista = await db.collection(COLLECTION).find().toArray();
    return lista.map(mapVoluntariado);
}

/**
 * Busca y devuelve un único voluntariado basándose en su ID de MongoDB.
 * @async
 * @param {string} id - El ID del voluntariado a buscar (debe ser un string que represente un ObjectId).
 * @returns {Promise<Voluntariado | null>} El objeto Voluntariado mapeado, o null si no se encuentra.
 */
export async function getVoluntariadoById(id){
    const db = await getDB();
    const v = await db.collection(COLLECTION).findOne({_id: new ObjectId(id)});

    return v ? mapVoluntariado(v): null;
}

/**
 * Inserta un nuevo documento de voluntariado en la colección.
 * @async
 * @param {Omit<VoluntariadoDB, '_id'>} data - Objeto con los datos del nuevo voluntariado.
 * @returns {Promise<Voluntariado>} El objeto del voluntariado insertado, incluyendo el ID como string.
 */
export async function createVoluntariado(data){
    console.log("Datos recibidos en createVoluntariado", data)
    const db = await getDB();

    const result = await db.collection(COLLECTION).insertOne(data);
    return {
        id: result.insertedId.toString(),
        ...data
    }
};

/**
 * Actualiza los campos especificados de un voluntariado por su ID.
 * @async
 * @param {string} id - El ID del voluntariado a actualizar.
 * @param {Object} data - Objeto con los campos y nuevos valores a aplicar ($set).
 * @returns {Promise<Voluntariado | null>} El voluntariado actualizado o null si no se encuentra.
 */
export async function updateVoluntariado(id, data){
    const db = await getDB();
    await db.collection(COLLECTION).updateOne(
        {_id: new ObjectId(id)},
        {$set: data}

    );

        return await getVoluntariadoById(id);
}

/**
 * Elimina un voluntariado basándose en su ID de MongoDB.
 * @async
 * @param {string} id - El ID del voluntariado a eliminar.
 * @returns {Promise<void>}
 */
export async function deleteVoluntariado(id){
    const db = await getDB();
    await db
        .collection(COLLECTION)
        .deleteOne({_id: new ObjectId(id)});
}

/**
 * Busca y devuelve un voluntariado basándose en su posición (índice) en el array de todos los voluntariados.
 * @async
 * @param {number} index - El índice (posición) del voluntariado a buscar.
 * @returns {Promise<Voluntariado | null>} El objeto Voluntariado mapeado, o null si el índice está fuera de rango.
 */
export async function getVoluntariadoByIndex(index){
    const voluntariados = await getAllVoluntariados();

    if (index < 0 || index >= voluntariados.length) return null;

    return voluntariados[index];
}

/**
 * Actualiza los campos especificados de un voluntariado basándose en su índice.
 * @async
 * @param {number} index - El índice del voluntariado a actualizar.
 * @param {Object} cambios - Objeto con los campos y nuevos valores a aplicar ($set).
 * @returns {Promise<boolean>} Devuelve `true` si se actualizó, `false` si el índice está fuera de rango.
 */
export async function updateVoluntariadoByIndex(index, cambios){
    const voluntariados = await getAllVoluntariados();

    if (index < 0 || index >= voluntariados.length) return false;

    const voluntariado = voluntariados[index];

    const db = await getDB();

    await db.collection("voluntariados").updateOne(
        {_id: new ObjectId(voluntariado.id)},
        {$set: cambios}
    );
    return true;
}

/**
 * Elimina un voluntariado basándose en su índice.
 * @async
 * @param {number} index - El índice del voluntariado a eliminar.
 * @returns {Promise<boolean>} Devuelve `true` si se eliminó, `false` si el índice está fuera de rango.
 */
export async function deleteVoluntariadoByIndex(index){
    const voluntariados = await getAllVoluntariados();

    if(index < 0 || index >= voluntariados.length) return false;

    const voluntariado = voluntariados[index];
    const db = await getDB();

    await db.collection("voluntariados").deleteOne({
        _id: new ObjectId(voluntariado.id)
    });
    return true;
}