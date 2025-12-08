/**
 * Importa las configuraciones de entorno desde dotenv.
 * @external "dotenv/config"
 */
import "dotenv/config";
/**
 * Importa la clase MongoClient del paquete 'mongodb'.
 * @external MongoClient
 */
import {MongoClient} from "mongodb";

/**
 * La URL de conexión a la instancia de MongoDB.
 * Se obtiene de la variable de entorno MONGO_URI o usa una URL por defecto.
 * 
 * @type {string}
 */
const url = process.env.MONGO_URI || "mongodb://admin:admin123@localhost:27017";
/**
 * Instancia del cliente de MongoDB usada para manejar la conexión.
 * 
 * @type {MongoClient}
 */
const client = new MongoClient(url);

/**
 * Variable que almacena la instancia de la base de datos (DB) una vez conectada.
 * Inicialmente es `null`. Implementa el patrón Singleton para mantener una única conexión.
 * 
 * @type {import('mongodb').Db | null}
 */
let db = null;

/**
 * Inicializa y devuelve la instancia de la base de datos de MongoDB.
 * Si la conexión no ha sido establecida previamente, intenta conectar
 * usando la URL configurada y selecciona la base de datos "voluntariados-REMM".
 * 
 * @async
 * @returns {Promise<import('mongodb').Db>} Promesa que resuelve con el objeto de la base de datos.
 */
export async function getDB(){
    if(!db){
        await client.connect();
        db = client.db("voluntariados-REMM");
        console.log("Conectado a MongoDB");
    }
    return db;
}