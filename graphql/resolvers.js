import { usuarios, setUsuarios, usuarioActivo, setUsuarioActivo } from "../data/usuarios.js";

export const root = {

    usuarios: () => usuarios,
    
    usuariosPorEmail: ({email}) =>
        usuarios.find(u => u.email === email) || null,

    existeEmail: ({email}) =>
        usuarios.some(u => u.email === email),

    usuarioActivo: () => usuarioActivo,

    login: ({email, password}) => {
        const encontrado = usuarios.find(u => u.email === email);

        if(!encontrado) return null;
        if(encontrado.password !== password) return null;

        setUsuarioActivo(encontrado.nombre);
        return encontrado;
    },

    crearUsuario: ({datos}) => {
        usuarios.push(datos);
        return datos;
    },

    borrarUsuarioPorEmail: ({email}) => {
        const listaNueva = usuarios.filter(u => u.email !== email);
        setUsuarios(listaNueva);
        return "Usuario eliminado"
    },

    borrarUsuarioPorIndice: ({indice}) => {
        if(indice < 0 || indice >= usuarios.length){
            return "Índice fuera de rango";
        }
        usuarios.splice(indice, 1);
        return "Usuario borrado por índice";
    },

    limpiarUsuarioActivo: () => {
        setUsuarioActivo(null);
        return "Sesión cerrada";
    }
};