import useConnection from "../../../database";

export const createEvento = async (req, res) => {
  const response = {
    success: false,
    message: "No se pudo obtener los eventos",
    data: [],
  };

  const {
    id_beneficiado,
    nombre, 
    descripcion, 
    fecha_inicio, 
    fecha_fin, 
    calle, 
    numero_exterior, 
    numero_interior, 
    colonia, alcaldia, 
    codigo_postal, 
    entidad, 
    imagen,
    categorias } = req.body;

  if(
    !id_beneficiado ||
    !nombre || 
    !descripcion || 
    !fecha_inicio || 
    !fecha_fin || 
    !calle ||
    !numero_exterior || 
    !colonia || 
    !alcaldia || 
    !codigo_postal || 
    !entidad || 
    !imagen ||
    !categorias) {
      response.success = false;
      response.message = "Falta informacion";
      return res.status(400).json(response);
  }

  const query = `
  INSERT INTO evento (
    id_beneficiado,
    nombre, 
    descripcion, 
    fecha_inicio, 
    fecha_fin, 
    calle, 
    numero_exterior, 
    numero_interior, 
    colonia, 
    alcaldia, 
    codigo_postal, 
    entidad, 
    imagen) 

  VALUES(
    '${id_beneficiado}',
    '${nombre}', 
    '${descripcion}',  
    '${fecha_inicio}', 
    '${fecha_fin}', 
    '${calle}', 
    '${numero_exterior}', 
    '${numero_interior ?? 'NULL'}',  
    '${colonia}', 
    '${alcaldia}', 
    '${codigo_postal}', 
    '${entidad}', 
    '${imagen ?? 'NULL'}');`;

    try {
      const connection = await useConnection();

      const result = await connection.query(query);

      if(result[0].affectedRows !== 1) {
        throw new Error("No se pudo crear el evento");
      }

      const eventoId = result[0].insertId;

      let categoriasQuery = `
      INSERT INTO evento_categoria (
        id_evento,
        id_categoria
      )
      VALUES`;
    
      categorias.forEach((categoria) => {
        categoriasQuery += `(${eventoId}, '${categoria}'),`;
      });

      categoriasQuery = categoriasQuery.slice(0, -1) + ";";

      const categoriasResult = await connection.query(categoriasQuery);

      if(categoriasResult[0].affectedRows !== categorias.length) {
        throw new Error("No se pudo crear las categorias");
      }

      const array1 = Array(18).fill(0);
      const array2 = Array(18).fill(1);

      categorias.forEach((categoria) => {
        array1[categoria - 1] = 1;
        array2[categoria - 1] = 0;
      });

      let matriz = [array1, array2];
      
      matriz = matriz.map(row => row.map(col => (col + 1)/3));

      const normalizacionQuery = `
      INSERT INTO normalizacion (
        id_evento,
        matriz
      )
      VALUES (
        '${eventoId}',
        '${JSON.stringify(matriz)}'
      )`;

      const resultNormalizacion = await connection.query(normalizacionQuery);

      if(resultNormalizacion[0].affectedRows !== 1) {
        throw new Error("No se pudo crear las normalizaciones");
      }

      response.success = true;
      response.message = "Evento creado";
      response.data = eventoId;
      res.status(200).json(response);

    } catch (error) {
      console.error(error);
      response.success = false;
      response.message = error.message;
      res.status(400).json(response)
    }
}