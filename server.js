import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// import usuariosRoutes from "./routes/usuarios";
import voluntariadosRoutes from "./routes/voluntariados.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// app.use("/usuarios", usuariosRoutes);
app.use("/voluntariados", voluntariadosRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});