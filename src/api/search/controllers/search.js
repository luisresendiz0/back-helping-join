import useConnection from "../../../database";

export const search = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  const {
    text, // texto a buscar
    type, // eventos, organizaciones, civiles independientes
    categoryId, // categoria de evento u organizacion
    fecha_inicio, // fecha de inicio de evento
    fecha_fin, // fecha de fin de evento
    entidad, // estado de evento u organizacion
    alcaldia, // ciudad de evento u organizacion
  } = req.body;

  try {
    // if(!text) throw new Error('No se ha enviado texto a buscar');
    if(!type) throw new Error('No se ha enviado tipo de busqueda');
    if(!categoryId) throw new Error('No se ha enviado categoria de busqueda');
    if(!fecha_inicio) throw new Error('No se ha enviado fecha de inicio de busqueda');
    if(!fecha_fin) throw new Error('No se ha enviado fecha de fin de busqueda');
    if(!entidad) throw new Error('No se ha enviado entidad de busqueda');
    if(!alcaldia) throw new Error('No se ha enviado alcaldia de busqueda');

    let searchQuery = '';

    if(type === 'evento') {
      // buscar eventos

      // SELECT id_evento, id_beneficiado, nombre, descripcion, fecha_inicio, fecha_fin, calle, numero_exterior, numero_interior, colonia, alcaldia, codigo_postal, entidad, imagen FROM db_helping_join.evento;
      searchQuery = `
      SELECT e.*
      FROM evento e
      INNER JOIN evento_categoria ec ON e.id_evento = ec.id_evento
      WHERE 
        ${text ? `(nombre LIKE '%${text}%'OR descripcion LIKE '%${text}%') OR` : ''}
        (fecha_inicio >= '${fecha_inicio}'
        OR fecha_fin <= '${fecha_fin}'
        OR entidad LIKE '%${entidad}%'
        OR alcaldia LIKE '%${alcaldia}%'
        OR ec.id_categoria = ${categoryId})
      GROUP BY e.id_evento
      `;
    }

    if(type === 'organizacion' || type === 'civil') {
      // buscar organizaciones o civiles

      // SELECT id_beneficiado, nombre, imagen, tipo, calle, numero_exterior, numero_interior, colonia, alcaldia, codigo_postal, entidad, telefono, descripcion, responsable, email, contrasena, evento_eliminados FROM db_helping_join.beneficiado;
      searchQuery = `
      SELECT b.*
      FROM beneficiado b
      INNER JOIN beneficiado_categoria bc ON b.id_beneficiado = bc.id_beneficiado
      WHERE 
        ${text ? `(nombre LIKE '%${text}%' OR descripcion LIKE '%${text}%' OR responsable LIKE '%${text}%') OR` : ''}
        (tipo = '${type}'
        OR entidad LIKE '%${entidad}%'
        OR alcaldia LIKE '%${alcaldia}%'
        OR bc.id_categoria = ${categoryId})
      GROUP BY b.id_beneficiado
      `;
    }

    const connection = await useConnection();

    const [searchResult] = await connection.query(searchQuery);

    response.success = true;
    response.message = "Busqueda exitosa";
    response.data = searchResult;
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    response.success = false;
    response.message = "No se pudo realizar la busqueda";
    response.data = [];
    return res.status(500).json(response);
  }
}