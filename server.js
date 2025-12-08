/**
 * @module server
 * Servidor principal de la API GraphQL para el sistema de voluntariados.
 * Configura Express.js con middleware y el endpoint GraphQL.
 */
import dotenv from "dotenv";

/**
 * Carga las variables de entorno desde el archivo .env.
 */
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import jwt from "jsonwebtoken";

import { schema } from "./graphql/schema.js";
import { root } from "./graphql/resolvers.js";

/**
 * Aplicación Express principal.
 * @type {import('express').Express}
 */
const app = express();

/**
 * Puerto en el que escuchará el servidor.
 * Usa la variable de entorno PORT o 3000 por defecto.
 * @type {number}
 */
const port = process.env.PORT || 3000;

/**
 * Middleware para parsear cuerpos JSON en las peticiones entrantes.
 */
app.use(bodyParser.json());

/**
 * Middleware CORS que permite peticiones desde cualquier origen.
 */
app.use(cors());

/**
 * Middleware para extraer JWT del header Authorization: Bearer <token>.
 * Si el token es válido, se añade el usuario decodificado en req.user.
 */
app.use((req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
      req.user = decoded;
    } catch {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
});

/**
 * Middleware GraphQL principal en la ruta /graphql.
 * Expone la API GraphQL completa con interfaz GraphiQL en desarrollo.
 */
app.use("/graphql", (req, res) =>
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
    // Pasamos el usuario autenticado al contexto de GraphQL
    context: { user: req.user }
  })(req, res)
);

/**
 * Inicia el servidor HTTP escuchando en el puerto configurado.
 */
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
