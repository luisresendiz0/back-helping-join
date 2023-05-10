import useConnection from "../../../database";


export const deleteBeneficiado = async (req, res) => {
  const result = {
    success: false,
    message: '',
    data: null
  }

  try {
    const { beneficiadoId } = req.params;

    if(!beneficiadoId) {
      throw new Error("No se recibió el id del beneficiado");
    }

    const connection = await useConnection();

    const deleteeventocatsquery = `
    delete ec from evento_categoria ec
    inner join evento e on ec.id_evento = e.id_evento
    where e.id_beneficiado = ${beneficiadoId};`;

    const deleteeventocatsresult = await connection.query(deleteeventocatsquery);

    if(deleteeventocatsresult[0].affectedRows === 0) {
      throw new Error("deleteeventocatsquery: No se pudo eleminar el beneficiado");
    }

    const deleteEventoVoluntarioQuery = `
    delete ev from evento_voluntario ev
    inner join evento e on ev.id_evento = e.id_evento
    where e.id_beneficiado = ${beneficiadoId};`;

    await connection.query(deleteEventoVoluntarioQuery);

    const deleteNormalizacionQuery = `
    delete n from normalizacion n
    inner join evento e on n.id_evento = e.id_evento
    where e.id_beneficiado = ${beneficiadoId};`;

    const deleteNormalizacionResult = await connection.query(deleteNormalizacionQuery);

    if(deleteNormalizacionResult[0].affectedRows === 0) {
      throw new Error("deleteNormalizacionQuery: No se pudo eleminar el beneficiado");
    }

    const deleteReportesQuery = `
    delete r from reporte r
    inner join evento e on r.id_evento = e.id_evento
    where e.id_beneficiado = ${beneficiadoId};`;

    await connection.query(deleteReportesQuery);

    const deleteEventosQuery = `
    delete e from evento e
    where e.id_beneficiado = ${beneficiadoId};`;

    const deleteEventosResult = await connection.query(deleteEventosQuery);

    if(deleteEventosResult[0].affectedRows === 0) {
      throw new Error("deleteEventosQuery: No se pudo eleminar el beneficiado");
    }

    const deleteBeneficiadoCatsQuery = `
    delete bc from beneficiado_categoria bc
    where bc.id_beneficiado = ${beneficiadoId};`;

    const deleteBeneficiadoCatsResult = await connection.query(deleteBeneficiadoCatsQuery);

    if(deleteBeneficiadoCatsResult[0].affectedRows === 0) {
      console.log(deleteBeneficiadoCatsResult[0]);
      throw new Error("deleteBeneficiadoCatQuery: No se pudo eleminar el beneficiado");
    }

    const deleteBeneficiadoQuery = `
    delete from beneficiado
    where id_beneficiado = ${beneficiadoId};`;

    const deleteBeneficiadoResult = await connection.query(deleteBeneficiadoQuery);

    if(deleteBeneficiadoResult[0].affectedRows === 0) {
      throw new Error("deleteBeneficiadoQuery: No se pudo eleminar el beneficiado");
    }

    result.success = true;
    result.message = "Beneficiado eliminado";
    result.data = null;
    return res.status(200).json(result);

  } catch (error) {
    console.error(error);
    result.success = false;
    result.message = error.message;
    result.data = null;
    return res.status(500).json(result);
  }
}

export default deleteBeneficiado;