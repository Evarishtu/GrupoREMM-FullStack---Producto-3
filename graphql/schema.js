import { buildSchema } from "graphql";

export const schema = buildSchema(`
    type Usuario{
        nombre: String
        email: String
        password: String
    }
    
    enum TipoVoluntariado {
        PETICION
        OFERTA
    }

    type Voluntariado{
    id: ID
    titulo: String
    usuario: String
    fecha: String
    descripcion: String
    tipo: TipoVoluntariado
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
            tipo: TipoVoluntariado!
        ): Voluntariado

        actualizarVoluntariado(
            id: ID!,
            titulo: String,
            usuario: String,
            fecha: String,
            descripcion: String,
            tipo: TipoVoluntariado
        ): String

        actualizarVoluntariadoPorIndice(
            indice: Int!,
            titulo: String,
            usuario: String,
            fecha: String,
            descripcion: String,
            tipo: TipoVoluntariado
        ): String

        eliminarVoluntariado(id: ID!): String
        eliminarVoluntariadoPorIndice(indice: Int!): String
    }
`);