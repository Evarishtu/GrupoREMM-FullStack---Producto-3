import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {graphqlHTTP} from "express-graphql";
import {schema} from "./graphql/schema.js";
import {root} from "./graphql/resolvers.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/graphql",
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
    })
);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});