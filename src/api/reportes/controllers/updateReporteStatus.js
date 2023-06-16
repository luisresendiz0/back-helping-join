import useConnection from "../../../database";

export const updateReporteStatus = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const { eventoId } = req.body;

    if (!eventoId) {
      throw new Error("No se proporcionó el id del evento");
    }

    const query = `
    update reporte
    set estatus = 'verificado'
    where id_evento = ${eventoId};`;

    const connection = await useConnection();

    const result = await connection.query(query);

    if (result[0].length === 0) {
      await connection.end();
      throw new Error("No se han modificado reportes");
    }

    response.success = true;
    response.message = "Reportes modificados";
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
