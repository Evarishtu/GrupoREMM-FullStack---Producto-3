export let usuarios = [
    {
        nombre: "Admin",
        email: "admin@mail.com",
        password: "1234"
    }
];
export let usuarioActivo = null;

export function setUsuarios(nuevos){
    usuarios = nuevos;
}

export function setUsuarioActivo(nombre){
    usuarioActivo = nombre;
}