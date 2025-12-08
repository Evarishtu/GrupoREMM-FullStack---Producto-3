/**
 * @module server
 * Servidor principal de la API GraphQL para el sistema de voluntariados.
 * Configura Express.js con middleware y el endpoint GraphQL.
 */
import dotenv from "dotenv";

/**
 * Carga las variables de entorno desde el archivo .env.
 * Configura process.env con todas las variables necesarias.
 */
dotenv.config();

/**
 * Framework web para Node.js que maneja peticiones HTTP y middleware.
 * Proporciona routing, middleware y manejo de requests/responses.
 * 
 */
import express from "express";

/**
 * Middleware CORS para permitir peticiones cross-origin.
 */
import cors from "cors";

/**
 * Middleware para parsear cuerpos JSON en las peticiones HTTP.
 */
import bodyParser from "body-parser";

/**
 * Middleware de Express GraphQL para exponer la API GraphQL.
 */
import {graphqlHTTP} from "express-graphql";

/**
 * Esquema GraphQL completo de la aplicación.
 */
import {schema} from "./graphql/schema.js";

/**
 * Resolvers (funciones de resolución) para todas las queries y mutations.
 */
import {root} from "./graphql/resolvers.js";

/**
 * Aplicación Express principal.
 * 
 * @type {import('express').Express}
 */
const app = express();

/**
 * Puerto en el que escuchará el servidor.
 * Usa la variable de entorno PORT o 3000 por defecto.
 * 
 * @type {number}
 */
const port = process.env.PORT || 3000;

/**
 * Middleware para parsear cuerpos JSON en las peticiones entrantes.
 * Limita el tamaño máximo a 10mb por defecto.
 */
app.use(bodyParser.json());

/**
 * Middleware CORS que permite peticiones desde cualquier origen.
 * Configuración por defecto: permite todos los métodos y headers.
 */

app.use(cors());
/**
 * Middleware GraphQL principal en la ruta /graphql.
 * Expone la API GraphQL completa con interfaz GraphiQL en desarrollo.
 */
app.use("/graphql",
    graphqlHTTP({
        /**
         * Esquema GraphQL que define todos los tipos, queries y mutations.
         * @type {import('graphql').GraphQLSchema}
         */
        schema,
        /**
         * Objeto raíz que contiene todos los resolvers (funciones de resolución).
         * @type {Object}
         */
        rootValue: root,
        /**
         * Habilita la interfaz GraphiQL en desarrollo para testing interactivo.
         * @type {boolean}
         */
        graphiql: true
    })
);

/**
 * Inicia el servidor HTTP escuchando en el puerto configurado.
 * Registra un mensaje de confirmación en la consola al iniciar correctamente.
 * 
 * @param {number} port - Puerto del servidor.
 * @returns {void}
 * @listens express~listening
 */
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});