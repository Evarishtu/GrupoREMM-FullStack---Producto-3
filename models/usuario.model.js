import { ObjectId } from "mongodb";
import { getDB } from "../database/database.js";

const COLLECTION = "usuarios";

export async function getAllUsuarios() {
    const db = await getDB();
    return db.collection(COLLECTION).find().toArray();
}

export async function getUsuarioByEmail(email) {
    const db = await getDB();
    return db.collection(COLLECTION).findOne({ email });
}

export async function createUsuario(data) {
    const db = await getDB();
    const result = await db.collection(COLLECTION).insertOne(data);

    return {
        id: result.insertedId,
        ...data
    };
}

export async function deleteUsuarioByEmail(email) {
    const db = await getDB();
    await db.collection(COLLECTION).deleteOne({ email });
}

export async function deleteUsuarioByIndex(index) {
    const usuarios = await getAllUsuarios();

    if (index < 0 || index >= usuarios.length)
        return false;

    const user = usuarios[index];

    const db = await getDB();
    await db.collection(COLLECTION).deleteOne({ email: user.email });

    return true;
}

let usuarioActivo = null;

export function getUsuarioActivo() {
    return usuarioActivo;
}

export function setUsuarioActivo(nombre) {
    usuarioActivo = user;
}

export function limpiarUsuarioActivo() {
    usuarioActivo = null;
}