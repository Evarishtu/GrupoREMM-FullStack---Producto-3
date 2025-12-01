import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Usuario{
        nombre: String
        email: String
        password: String
    }

    type Voluntariado{
    id: ID
    titulo: String
    usuario: String
    fecha: String
    descripcion: String
    tipo: String
    }

    type Query{
        usuarios: [Usuario]
        usuarioPorEmail(email: String!): Usuario
        usuarioActivo: Usuario

        voluntariados: [Voluntariado]
        voluntariadoPorId(id: ID): Voluntariado
    }
    
    type Mutation{
        crearUsuario(nombre: String!, email: String!, password: String!): Usuario
        borrarUsuarioPorEmail(email: String!): String
        borrarUsuarioPorIndice(indice: Int!): String
        limpiarUsuarioActivo: String
        login(email: String!, password: String!): Usuario

        crearVoluntariado(
            titulo: String!,
            usuario: String!,
            fecha: String!,
            descripcion: String!,
            tipo: String!
        ): Voluntariado

        actualizarVoluntariado(
            id: ID!,
            titulo: String,
            usuario: String,
            fecha: String,
            descripcion: String,
            tipo: String
        ): String

        eliminarVoluntariado(id: ID!): String
    }
`);