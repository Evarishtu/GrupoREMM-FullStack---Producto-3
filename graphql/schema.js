import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Usuario{
        nombre: String
        email: String
        password: String
    }
    type Query{
        usuarios: [Usuario]
        usuariosPorEmail(email: String!): Usuario
        existeEmail(email: String!): Boolean
        usuarioActivo: String
        login(email: String!, password: String!): Usuario
    }
    input UsuarioInput{
        nombre: String
        email: String
        password: String
    }
    type Mutation{
        crearUsuario(datos: UsuarioInput!): Usuario
        borrarUsuarioPorEmail(email: String!): String
        borrarUsuarioPorIndice(indice: Int!): String
        limpiarUsuarioActivo: String
    }
`);