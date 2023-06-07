import useConnection from "../../../database";

const deleteVoluntarioById = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null
  }

  try {
    const { voluntarioId } = req.body;

    if(!voluntarioId) {
      throw new Error("No se ha enviado voluntario id");
    }

    const connection = await useConnection();

    const deleteCatsQuery = `delete from voluntario_categoria where id_voluntario = ${voluntarioId};`

    await connection.query(deleteCatsQuery);

    const deleteReportesQuery = `delete from reporte where id_voluntario = ${voluntarioId};`

    await connection.query(deleteReportesQuery);

    const deleteRecomendacionQUery = `delete from recomendacion where id_voluntario = ${voluntarioId};`

    await connection.query(deleteRecomendacionQUery);

    const deleteEventosQuery = `delete from evento_voluntario where id_voluntario = ${voluntarioId};`

    await connection.query(deleteEventosQuery);

    const deleteVoluntarioQuery = `delete from voluntario where id_voluntario = ${voluntarioId};`

    await connection.query(deleteVoluntarioQuery);

    response.success = true;
    response.message = "Se ha eliminado el voluntario correctamente";

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.success = false
    response.message = error.message
    res.status(400).json(response);
  }
}

export default deleteVoluntarioById;