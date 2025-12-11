# GrupoREMM-FullStack---Producto-3

Una API backend basada en GraphQL para una plataforma de voluntariado y donaciones. Este sistema gestiona usuarios y oportunidades de voluntariado con soporte para crear, leer, actualizar y eliminar publicaciones de voluntariado.

## Stack Tecnológico

- **Backend:** Node.js con Express.js
- **API:** GraphQL (express-graphql)
- **Base de datos:** MongoDB
- **Autenticación:** JSON Web Tokens (JWT) y bcrypt
- **Librerías adicionales:** CORS, body-parser

## Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente instalado:

- **Node.js** (v14 o superior)
- **npm** (viene con Node.js)
- **MongoDB** (ejecutándose localmente o accesible mediante cadena de conexión)

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Evarishtu/GrupoREMM-FullStack---Producto-3.git
   cd GrupoREMM-FullStack---Producto-3
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Configurar las variables de entorno:**
   Crea un archivo llamado `.env` en la raíz del proyecto y define las siguientes variables para la conexión a la base de datos y la seguridad:
   ```env
   MONGO_URI=mongodb+srv://user:password@cluster...
   MONGO_DB_NAME=voluntariados-REMM
   JWT_SECRET=tu_secreto_seguro_para_jwt
   PORT=3000
   ```

## Cómo iniciar el proyecto

### Modo de desarrollo (recomendado)

Inicia el servidor con recarga automática habilitada usando Nodemon:

```bash
npm run dev
```

El servidor se iniciará y se reiniciará automáticamente cada vez que realices cambios en tu código.

### Modo de producción

Inicia el servidor directamente:

```bash
node server.js
```

**Salida esperada:**
```
Servidor escuchando en http://localhost:3000
```

### Puerto personalizado

Para ejecutar el servidor en un puerto diferente, establece la variable de entorno `PORT`:

```bash
PORT=8000 npm run dev
```

## Accediendo a la interfaz GraphQL

Una vez que el servidor esté en funcionamiento, abre tu navegador y ve a:

```
http://localhost:3000/graphql
```

Esto abre **GraphiQL**, un IDE interactivo donde puedes:
- Escribir y probar consultas GraphQL
- Explorar el esquema de GraphQL
- Ver documentación de consultas
- Depurar tus llamadas a API

Importante para Mutaciones: Para probar Mutaciones que requieren autenticación, debes obtener primero un token de la login Mutation e incluirlo en la pestaña de HTTP HEADERS de GraphiQL:

```JSON
{
  "Authorization": "Bearer <el_token_que_recibiste_en_login>"
}
```

## Estructura del proyecto

```
proyecto-3/
├── graphql/
│   ├── schema.js               # Definiciones de tipos de GraphQL y esquema
│   └── resolvers.js            # Resolvedores de consultas y mutaciones de GraphQL
├── models/
│   ├── usuario.model.js        # Operaciones de datos de usuarios
│   └── voluntariado.model.js   # Operaciones de datos de oportunidades de voluntariado
├── data/
│   ├── usuarios.js             # Datos de usuarios de muestra
│   └── voluntariados.js        # Datos de voluntariado de muestra
├── database/
│   └── database.js             # Configuración y conexión Singleton a MongoDB
├── server.js                   # Punto de entrada del servidor Express y middleware de JWT
├── package.json                # Dependencias y scripts del proyecto
├── docker-compose.yml          # Configuración de Docker
├── .env                        # Variables de entorno (conexión DB, JWT Secret)
└── README.md                   # Este archivo
```

## Entidades principales

### Usuario

**Campos:**
- `nombre` (String): Nombre completo del usuario
- `email` (String): Correo electrónico del usuario (identificador único)
- `password` (String): Contraseña del usuario (almacenada hasheada con bcrypt)

### Voluntariado

**Campos:**
- `id` (ID): ObjectId de MongoDB (convertido a string)
- `titulo` (String): Título de la oportunidad de voluntariado
- `usuario` (String): Correo electrónico del usuario que la publicó
- `fecha` (String): Fecha asociada a la oportunidad
- `descripcion` (String): Descripción del trabajo de voluntariado
- `tipo` (Enum): Tipo de publicación - `PETICION` (solicitud) u `OFERTA` (oferta)

## API GraphQL

### Consultas

```graphql
# Obtener todos los usuarios
query {
  usuarios {
    nombre
    email
  }
}

# Obtener usuario por correo
query {
  usuarioPorEmail(email: "usuario@example.com") {
    nombre
    email
  }
}

# Obtener todas las oportunidades de voluntariado
query {
  voluntariados {
    id
    titulo
    usuario
    fecha
    descripcion
    tipo
  }
}

# Obtener oportunidad de voluntariado por ID
query {
  voluntariadoPorId(id: "507f1f77bcf86cd799439011") {
    id
    titulo
    descripcion
  }
}
```

### Mutaciones

#### Mutaciones de usuario

```graphql
# Crear nuevo usuario
mutation {
  crearUsuario(
    nombre: "Juan Pérez"
    email: "juan@example.com"
    password: "contraseña123"
  ) {
    nombre
    email
  }
}

# Iniciar sesión de usuario
mutation {
  login(
    email: "juan@example.com"
    password: "contraseña123"
  ) {
    nombre
    email
  }
}

# Eliminar usuario por correo
mutation {
  borrarUsuarioPorEmail(email: "juan@example.com")
}

# Eliminar usuario por índice
mutation {
  borrarUsuarioPorIndice(indice: 0)
}
```

#### Mutaciones de voluntariado

```graphql
# Crear nueva oportunidad de voluntariado
mutation {
  crearVoluntariado(
    titulo: "Ayuda en el banco de alimentos"
    usuario: "juan@example.com"
    fecha: "2024-12-15"
    descripcion: "Necesitamos voluntarios para ayudar a empacar cajas de alimentos"
    tipo: OFERTA
  ) {
    id
    titulo
  }
}

# Actualizar oportunidad de voluntariado por ID
mutation {
  actualizarVoluntariado(
    id: "507f1f77bcf86cd799439011"
    titulo: "Título actualizado"
    descripcion: "Descripción actualizada"
  )
}

# Actualizar oportunidad de voluntariado por índice
mutation {
  actualizarVoluntariadoPorIndice(
    indice: 0
    titulo: "Título actualizado"
  )
}

# Eliminar oportunidad de voluntariado por ID
mutation {
  eliminarVoluntariado(id: "507f1f77bcf86cd799439011")
}

# Eliminar oportunidad de voluntariado por índice
mutation {
  eliminarVoluntariadoPorIndice(indice: 0)
}
```

## Configuración con Docker

Para ejecutar el proyecto usando Docker Compose:

```bash
docker-compose up
```

Esto iniciará la base de datos MongoDB y la aplicación en contenedores.

## Notas de desarrollo

- **Autenticación:** Se utiliza JWT. Las operaciones de modificación requieren un token válido.
- **Seguridad de Contraseña:** Las contraseñas se hashean utilizando bcrypt con un factor de trabajo de 10 antes de ser almacenadas.
- **Tipos de voluntariado:** Solo `PETICION` y `OFERTA` son tipos válidos
- **Operaciones basadas en índices:** Algunas operaciones usan índice de array en lugar de IDs para compatibilidad hacia atrás
- **MongoDB requerido:** Asegúrate de que MongoDB esté correctamente configurado en `database/database.js`

## Soporte

Para problemas y solicitudes de características, visita el [repositorio de GitHub](https://github.com/Evarishtu/GrupoREMM-FullStack---Producto-3).

## Licencia

ISC
