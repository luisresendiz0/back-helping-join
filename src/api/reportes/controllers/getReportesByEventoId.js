import useConnection from "../../../database";

export const getReportesByEventoId = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const { eventoId } = req.query;

    if (!eventoId) {
      throw new Error("No se proporcionó el id del evento");
    }

    const query = `
    select 
      r.*,
      v.nombre as voluntario_nombre,
      v.imagen as voluntario_imagen
    from reporte r 
    inner join voluntario v on r.id_voluntario = v.id_voluntario 
    where id_evento = ${eventoId} and estatus = 'pendiente';`;

    const connection = await useConnection();

    const result = await connection.query(query);

    if (result[0].length === 0) {
      await connection.end();
      throw new Error("No hay reportes");
    }

    response.success = true;
    response.message = "Reportes obtenidos";
    response.data = result[0];

    await connection.end();
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    response.success = false;
    response.message = error.message;
    response.data = null;
    return res.status(500).json(response);
  }
};
