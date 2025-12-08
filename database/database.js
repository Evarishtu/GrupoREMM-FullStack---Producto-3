import "dotenv/config";
import {MongoClient} from "mongodb";

const url = process.env.MONGO_URI || "mongodb://admin:admin123@localhost:27017";
const client = new MongoClient(url);

let db = null;

export async function getDB(){
    if(!db){
        await client.connect();
        db = client.db("voluntariados-REMM");
        console.log("Conectado a MongoDB");
    }
    return db;
}