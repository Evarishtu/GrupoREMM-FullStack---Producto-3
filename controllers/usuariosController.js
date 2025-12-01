import {
    getAllUsuarios,
    getUsuarioByEmail,
    createUsuario,
    deleteUsuarioByEmail,
    deleteUsuarioByIndex,
    getUsuarioActivo,
    setUsuarioActivo,
    limpiarUsuarioActivo
} from "../models/usuario.model.js";

export async function listarUsuarios(req, res) {
    try {
        const lista = await getAllUsuarios();
        res.json(lista);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener usuarios" });
    }
}

export async function crear(req, res) {
    try {
        const usuario = await createUsuario(req.body);
        res.json({ mensaje: "Usuario creado", usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear usuario" });
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const usuario = await getUsuarioByEmail(email);

        if (!usuario || usuario.password !== password) {
            return res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }

        setUsuarioActivo(usuario.nombre);

        res.json({
            mensaje: "Login correcto",
            usuario
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error en login" });
    }
}

export async function eliminarPorEmail(req, res) {
    try {
        const email = req.params.email;
        await deleteUsuarioByEmail(email);
        res.json({ mensaje: "Usuario eliminado", email });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar" });
    }
}

export async function eliminarPorIndice(req, res) {
    const indice = Number(req.params.indice);

    try {
        const ok = await deleteUsuarioByIndex(indice);

        if (!ok) {
            return res.status(400).json({ mensaje: "Índice inválido" });
        }

        res.json({ mensaje: "Usuario eliminado por índice" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar" });
    }
}

export function obtenerActivo(req, res) {
    res.json({ usuarioActivo: getUsuarioActivo() });
}

export function logout(req, res) {
    limpiarUsuarioActivo();
    res.json({ mensaje: "Sesión cerrada" });
}