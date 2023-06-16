import useConnection from "../../../database";

export const getEventosInteres = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const { id_voluntario } = req.query;

    if (!id_voluntario) {
      throw new Error("No se ha enviado el id_voluntario");
    }

    const connection = await useConnection();

    const query = `
    SELECT
      e.id_evento,
      e.id_beneficiado,
      e.nombre,
      e.descripcion,
      e.fecha_inicio,
      e.fecha_fin,
      e.calle,
      e.numero_exterior,
      e.numero_interior,
      e.colonia,
      e.alcaldia,
      e.codigo_postal,
      e.entidad,
      e.imagen,
      GROUP_CONCAT(c.nombre SEPARATOR ', ') AS categorias
    FROM evento e
    INNER JOIN evento_voluntario ev ON ev.id_evento = e.id_evento
    INNER JOIN evento_categoria ec ON e.id_evento = ec.id_evento
    INNER JOIN categoria c ON ec.id_categoria = c.id_categoria
    WHERE ev.id_voluntario = ${id_voluntario}
    AND e.fecha_fin >= NOW()
    GROUP BY e.id_evento;`;

    const [eventos] = await connection.query(query);

    console.log(eventos[0].categorias);

    response.success = true;
    response.message = "Eventos obtenidos correctamente";
    response.data = eventos;

    await connection.end();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = error.message;
    return res.status(400).json(response);
  }
};
