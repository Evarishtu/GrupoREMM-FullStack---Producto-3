import {ObjectId} from "mongodb";
import {getDB} from "../database/database.js";

const COLLECTION = "voluntariados";

export async function getAllVoluntariados(){
    const db = await getDB();
    return db.collection(COLLECTION).find().toArray();
}

export async function getVoluntariadoById(id){
    const db = await getDB();
    return db
        .collection(COLLECTION)
        .findOne({_id: new ObjectId(id)});
}

export async function createVoluntariado(data){
    const db = await getDB();

    const result = await db.collection(COLLECTION).insertOne(data);

    return{
        id: result.insertedId,
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
}

export async function deleteVoluntariado(id){
    const db = await getDB();
    await db
        .collection(COLLECTION)
        .deleteOne({_id: new ObjectId(id)});
}