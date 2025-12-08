/**
 * @module database
 * Módulo responsable de la conexión a MongoDB.
 * Implementa un patrón Singleton para reutilizar la misma conexión
 * en todo el backend.
 */

import "dotenv/config";
import { MongoClient } from "mongodb";

/**
 * URL de conexión a la instancia de MongoDB.
 * Se obtiene de la variable de entorno MONGO_URI o usa una URL por defecto local.
 *
 * @type {string}
 */
const url = process.env.MONGO_URI || "mongodb://admin:admin123@localhost:27017";

/**
 * Nombre de la base de datos a utilizar dentro del servidor MongoDB.
 * Se puede configurar mediante la variable de entorno MONGO_DB_NAME.
 *
 * @type {string}
 */
const dbName = process.env.MONGO_DB_NAME || "voluntariados-REMM";

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
 * Inicializa (si es necesario) y devuelve la instancia de la base de datos de MongoDB.
 * Si la conexión no ha sido establecida previamente, intenta conectar usando la URL
 * configurada y selecciona la base de datos indicada en `dbName`.
 *
 * @async
 * @function getDB
 * @returns {Promise<import('mongodb').Db>} Promesa que resuelve con el objeto de la base de datos.
 */
export async function getDB() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log(`Conectado a MongoDB: ${dbName}`);
  }
  return db;
}
