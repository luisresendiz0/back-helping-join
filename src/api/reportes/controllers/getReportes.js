import useConnection from "../../../database";

export const getReportes = async (req, res) => {
  const response = {
    success: false,
    message: "No se pudo obtener los reportes",
    data: null
  }

  try {
    const query = `
    select 
      r.*, 
      COUNT(*) as reportes, 
      e.nombre AS evento_nombre,
      (select evento_eliminados from beneficiado where id_beneficiado = e.id_beneficiado) as eventos_eliminados
    from reporte r 
    inner join evento e on r.id_evento = e.id_evento
    where estatus = 'pendiente' 
    group by id_evento
    order by reportes desc;`;

    const connection = await useConnection();

    const result = await connection.query(query);

    if(result[0].length === 0) {
      throw new Error("No hay reportes");
    }

    response.success = true;
    response.message = "Reportes obtenidos";
    response.data = result[0];
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    response.success = false;
    response.message = error.message;
    response.data = null;
    return res.status(500).json(response);
  }
}