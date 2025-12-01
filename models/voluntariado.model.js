import {ObjectId} from "mongodb";
import {getDB} from "../database/database.js";

const COLLECTION = "voluntariados";

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

export async function getAllVoluntariados(){
    const db = await getDB();
    const lista = await db.collection(COLLECTION).find().toArray();
    return lista.map(mapVoluntariado);
}

export async function getVoluntariadoById(id){
    const db = await getDB();
    const v = await db.collection(COLLECTION).findOne({_id: new ObjectId(id)});

    return v ? mapVoluntariado(v): null;
}

export async function createVoluntariado(data){
    console.log("Datos recibidos en createVoluntariado", data)
    const db = await getDB();

    const result = await db.collection(COLLECTION).insertOne(data);

    return{
        id: result.insertedId.toString(),
        ...data
    };
}

export async function updateVoluntariado(id, data){
    const db = await getDB();
    await db
        .collection(COLLECTION)
        .updateOne(
            {_id: new ObjectId(id)},
            { $set: data}
        );

        return await getVoluntariadoById(id);
}

export async function deleteVoluntariado(id){
    const db = await getDB();
    await db
        .collection(COLLECTION)
        .deleteOne({_id: new ObjectId(id)});
}