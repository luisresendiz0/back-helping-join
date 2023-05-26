import useConnection from "../../../database";

export const updateEvento = async (req, res) => {
  const response = {
    success: false,
    message: '',
    data: null
  }

  try {
    let {
      alcaldia,
      calle,
      codigo_postal,
      colonia,
      descripcion,
      entidad,
      fecha_fin,
      fecha_inicio,
      id_evento,
      imagen,
      nombre,
      numero_exterior,
      numero_interior,
    } = req.body;

    fecha_inicio = new Date(fecha_inicio).toISOString().slice(0, 19).replace('T', ' ');
    fecha_fin = new Date(fecha_fin).toISOString().slice(0, 19).replace('T', ' ');

    let update = `
      UPDATE evento
      SET alcaldia = '${alcaldia}',
          calle = '${calle}',
          codigo_postal = '${codigo_postal}',
          colonia = '${colonia}',
          descripcion = '${descripcion}',
          entidad = '${entidad}',
          fecha_fin = '${fecha_fin}',
          fecha_inicio = '${fecha_inicio}',
          nombre = '${nombre}',
          numero_exterior = '${numero_exterior}',
          numero_interior = '${numero_interior}'`;
     

      if (imagen && imagen !== 'null' && imagen !== 'undefined' && imagen !== 'false' && imagen !== 'true' && imagen !== {} && imagen !== [] && typeof imagen !== 'object') {
        update += `, imagen = '${imagen}'`;
      }
      const where = ` WHERE id_evento = ${id_evento}`;

      update += where;

      const connection = await useConnection();

      const result = await connection.query(update);

      if (result[0].affectedRows !== 1) {
        throw new Error('No se pudo actualizar el evento');
      }

      const select = `SELECT * FROM evento WHERE id_evento = ${id_evento};`;

      const [evento] = await connection.query(select);

      if(evento.length === 0) {
        throw new Error('No se encontró el evento');
      }

      response.success = true;
      response.message = 'Evento actualizado';
      response.data = evento[0];

      res.status(200).json(response);


  } catch (error) {
    console.log(error);
    response.message = error.message;
    res.status(500).json(response);
  }
}