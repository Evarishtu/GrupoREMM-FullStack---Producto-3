/**
 * @module voluntariados
 * Este módulo gestiona la lista de voluntariados disponibles en el sistema y
 * proporciona funciones para modificarla.
 */

/**
 * Representa un voluntariado publicado por un usuario.
 * 
 * @typedef {Object} Voluntariado
 * @property {number} id - Identificador único del voluntariado.
 * @property {string} titulo - Título descriptivo de la oferta o petición.
 * @property {string} usuario - Nombre del usuario que publica el voluntariado.
 * @property {string} fecha - Fecha de publicación del voluntariado (formato 'YYYY-MM-DD').
 * @property {string} descripcion - Descripción detallada del voluntariado.
 * @property {'oferta'|'peticion'} tipo - Indica si es una oferta de servicio o una petición de ayuda.
 * @property {string} imagenFondo - URL de una imagen para representar visualmente el voluntariado.
 */

/**
 * Lista de todos los voluntariados disponibles en el sistema.
 * 
 * @type {Voluntariado[]}
 * @example
 * console.log(voluntariados[0].titulo);
 */
export let voluntariados = [
  {
    id: 1,
    titulo: 'Se ofrece chica para pasear perro',
    usuario: 'Meritxell Mosquera van den Bergh',
    fecha: '2025-01-10',
    descripcion: 'Chica responsable se ofrece para pasear perro los martes por la tarde',
    tipo: 'oferta',
    imagenFondo: 'https://www.hillspet.com/content/dam/cp-sites-aem/hills/hills-pet/legacy-articles/inset/beagle-with-tongue-out.jpg'
  },
  {
    id: 2,
    titulo: 'Se ofrece chico para pasear perro',
    usuario: 'Roque Carrillo Martinez',
    fecha: '2025-09-10',
    descripcion: 'Chico responsable se ofrece para pasear perro los martes por la tarde',
    tipo: 'oferta',
    imagenFondo: 'https://image.petmd.com/files/inline-images/shiba-inu-black-and-tan-colors.jpg?VersionId=pLq84BEOjdMjXeDCUJJJLFPuIWYsVMUU'
  },
  {
    id: 3,
    titulo: 'Se necesita persona para cuidar de una gata',
    usuario: 'Evarishtu Dongua Kuzin',
    fecha: '2025-05-10',
    descripcion: 'Se busca persona responsable para cuidar de una gata. Su ama ya no puede hacerse cargo',
    tipo: 'peticion',
    imagenFondo: 'https://www.minino.com/wp-content/uploads/2025/01/nota-de-blog-31-enero.png.webp'
  },
  {
    id: 4,
    titulo: 'Se necesita persona para adoptción de animal',
    usuario: 'Marc Espuga Moreno',
    fecha: '2025-07-10',
    descripcion: 'Se busca persona responsable para adoptar de una iguana. Con conocimientos sobre reptiles',
    tipo: 'peticion',
    imagenFondo: 'https://15f8034cdff6595cbfa1-1dd67c28d3aade9d3442ee99310d18bd.ssl.cf3.rackcdn.com/uploaded_thumb_big/c1dc328c546f572dfe66453867eeffb8/cuidar_iguana_domestica_consejos_clinica_veterinaria_la_granja_aviles.png'
  }
];

/**
 * Reemplaza la lista actual de voluntariados con una nueva lista.
 * 
 * @param {Voluntariado[]} nuevoArray - La nueva lista de objetos Voluntariado a establecer.
 * @returns {void}
 * @example
 * setVoluntariados([{ id: 5, titulo: 'Nueva oferta', usuario: 'Admin', fecha: '2025-12-01', descripcion: 'Voluntariado nuevo', tipo: 'oferta', imagenFondo: '' }]);
 */
export function setVoluntariados(nuevoArray) {
  voluntariados = nuevoArray;
}