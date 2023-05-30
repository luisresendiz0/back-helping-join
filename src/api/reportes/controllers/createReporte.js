import useConnection from "../../../database";

export const createReporte = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  const { id_voluntario, id_evento, descripcion } = req.body;

  if (!id_voluntario || !id_evento || !descripcion) {
    response.message = "Faltan datos";
    return res.status(400).json(response);
  }

  try {
    const query = `INSERT INTO reporte (
      id_voluntario, 
      id_evento, 
      descripcion,
      fecha,
      estatus
    ) VALUES (
      ${id_voluntario}, 
      ${id_evento}, 
      '${descripcion}',
      NOW(),
      'pendiente'
    )`;

    const connection = await useConnection();

    const result = await connection.query(query);

    if (result[0].affectedRows !== 1) {
      throw new Error("No se pudo crear el reporte");
    }

    await connection.end();
    response.success = true;
    response.message = "Reporte creado";
    response.data = null;
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    response.success = false;
    response.message = "No se pudo crear el reporte";
    response.data = null;
    return res.status(500).json(response);
  }
};
