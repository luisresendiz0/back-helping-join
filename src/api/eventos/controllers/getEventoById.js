import useConnection from "../../../database";

export const getEventoById = async (req, res) => {
  const response = {
    success: false,
    message: "No se pudo obtener el evento",
    data: null
  }
  try {
    const { voluntarioId, eventoId } = req.query;

    if(!eventoId || !voluntarioId) {
      throw new Error("No se recibieron los datos necesarios");
    }

    const connection = await useConnection();

    const query = `
    SELECT 
      *, 
      (select count(*) from evento_voluntario where id_evento = ${eventoId}) as interesados,
      (select id_ev from evento_voluntario where id_evento = ${eventoId} and id_voluntario = ${voluntarioId}) as interesado,
      (select id_reporte from reporte where id_evento = ${eventoId} and id_voluntario = ${voluntarioId}) as reportado
    FROM evento 
    WHERE id_evento = ${eventoId};`;

    const result = await connection.query(query);

    if(result[0].length === 0) {
      throw new Error("No se encontró el evento");
    }

    await connection.end();
response.success = true;
    response.message = "Evento obtenido";
    response.data = result[0][0];

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = error.message;
    response.data = null;
    res.status(500).json(response);
  }
}