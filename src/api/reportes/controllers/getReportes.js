import useConnection from "../../../database";

export const getReportes = async (req, res) => {
  const response = {
    success: false,
    message: "No se pudo obtener los reportes",
    data: []
  }

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

    await connection.end();
    response.success = true;
    response.message = "Reportes obtenidos";
    response.data = result[0];
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    response.success = false;
    response.message = error.message;
    response.data = [];
    return res.status(500).json(response);
  }
}