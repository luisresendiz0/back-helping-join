import useConnection from "../../../database";

export const getReportes = async (req, res) => {
  const response = {
    success: false,
    message: "No se pudo obtener los reportes",
    data: [],
  };

  try {
    const query = `
    SELECT
    e.id_evento AS id_evento,
    e.nombre AS evento_nombre,
    e.id_beneficiado AS id_beneficiado,
    (SELECT evento_eliminados FROM beneficiado WHERE id_beneficiado = e.id_beneficiado) AS eventos_eliminados,
    COUNT(r.id_reporte) AS reportes
    FROM evento e
    LEFT JOIN reporte r ON r.id_evento = e.id_evento
    GROUP BY e.id_evento, e.nombre, e.id_beneficiado
    HAVING COUNT(r.id_reporte) >= 1;`;

    const connection = await useConnection();

    const result = await connection.query(query);

    const eventos = result[0];
    const valid = []
    for(let evento of eventos) {
      const reportesQuery = `select count(r.id_reporte) as reportes_validos from reporte r where r.id_evento = ${evento.id_evento} and r.estatus != 'verificado';`;
      const reportesQueryResult = await connection.query(reportesQuery);
      if(reportesQueryResult[0][0].reportes_validos > 0) {
        valid.push(evento);
      }
    }

    response.success = true;
    response.message = "Reportes obtenidos";
    response.data = valid;

    await connection.end();
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    response.success = false;
    response.message = error.message;
    response.data = [];
    return res.status(500).json(response);
  }
};
