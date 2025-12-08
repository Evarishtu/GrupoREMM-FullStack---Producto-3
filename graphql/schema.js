/**
 * @module schema
 * Define el esquema GraphQL completo para la API de voluntariados.
 * Incluye tipos, enums, queries y mutations para usuarios y voluntariados.
 */
import { buildSchema } from "graphql";
/**
 * Esquema GraphQL completo de la aplicación.
 * Define todos los tipos, queries y mutations disponibles en la API.
 * 
 * @type {import('graphql').GraphQLSchema}
 */
export const schema = buildSchema(`
    """
    Representa un usuario del sistema con sus credenciales básicas.

    """
    type Usuario{
        nombre: String
        email: String
        password: String
    }
    """
    Enum que define los tipos posibles de voluntariado.

    """
    enum TipoVoluntariado {
        PETICION
        OFERTA
    }

    """
    Representa un voluntariado publicado en el sistema.
    Puede ser una oferta de servicios o una petición de ayuda.

    """
    type Voluntariado{
    id: ID
    titulo: String
    usuario: String
    fecha: String
    descripcion: String
    tipo: TipoVoluntariado
    }

    """
    Queries disponibles para consultar datos del sistema.

    """
    type Query{

        """
        Obtiene la lista completa de todos los usuarios registrados.

        """
        usuarios: [Usuario]

        """
        Busca un usuario específico por su dirección de correo electrónico.

        """
        usuarioPorEmail(email: String!): Usuario

        """
        Obtiene el usuario actualmente activo (logueado).

        """
        usuarioActivo: Usuario

        """
        Obtiene la lista completa de todos los voluntariados disponibles.

        """
        voluntariados: [Voluntariado]

        """
        Busca un voluntariado específico por su identificador único.

        """
        voluntariadoPorId(id: ID): Voluntariado
    }

    """
    Mutations disponibles para modificar datos del sistema.

    """
    type Mutation{
        """
        Crea un nuevo usuario en el sistema.

        """
        crearUsuario(nombre: String!, email: String!, password: String!): Usuario

        """
        Elimina un usuario específico por su email.

        """
        borrarUsuarioPorEmail(email: String!): String

        """
        Elimina un usuario por su posición en la lista (índice).

        """
        borrarUsuarioPorIndice(indice: Int!): String

        """
        Cierra la sesión del usuario activo.

        """
        limpiarUsuarioActivo: String

        """
        Inicia sesión validando credenciales y establece usuario activo.

        """
        login(email: String!, password: String!): Usuario

        """
        Crea un nuevo voluntariado en el sistema.

        """
        crearVoluntariado(
            titulo: String!,
            usuario: String!,
            fecha: String!,
            descripcion: String!,
            tipo: TipoVoluntariado!
        ): Voluntariado

        """
        Actualiza los campos de un voluntariado existente por su ID.
        Solo se actualizan los campos proporcionados.

        """
        actualizarVoluntariado(
            id: ID!,
            titulo: String,
            usuario: String,
            fecha: String,
            descripcion: String,
            tipo: TipoVoluntariado
        ): String

        """
        Actualiza los campos de un voluntariado por su posición en la lista (índice).
        Solo se actualizan los campos proporcionados.

        """
        actualizarVoluntariadoPorIndice(
            indice: Int!,
            titulo: String,
            usuario: String,
            fecha: String,
            descripcion: String,
            tipo: TipoVoluntariado
        ): String

        """
        Elimina un voluntariado específico por su ID.

        """
        eliminarVoluntariado(id: ID!): String

        """
        Elimina un voluntariado por su posición en la lista (índice).
        
        """
        eliminarVoluntariadoPorIndice(indice: Int!): String
    }
`);