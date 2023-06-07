import useConnection from "../../../database";

export const deleteEventoByBeneficiado = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null
  }

  try {
    const { eventoId } = req.body;

    if(!eventoId) {
      throw new Error("No se proporcionó el id del evento");
    }

    const connection = await useConnection();


    const deletecatsquery = `
    delete from evento_categoria
    where id_evento = ${eventoId};`;

    const deletecatsresult = await connection.query(deletecatsquery);

    if(deletecatsresult[0].affectedRows === 0) {
      throw new Error("deletecatsquery: No se han modificado eventos");
    }

    const deletevoluntariosquery = `
    delete from evento_voluntario
    where id_evento = ${eventoId};`;

    await connection.query(deletevoluntariosquery);

    const deletenormalizacionquery = `
    delete from normalizacion
    where id_evento = ${eventoId};`;

    const deletenormalizacionresult = await connection.query(deletenormalizacionquery);

    if(deletenormalizacionresult[0].affectedRows !== 1) {
      throw new Error("deletenormalizacioneventoquery: No se han modificado eventos");
    }

    const deletereportesquery = `
    delete from reporte
    where id_evento = ${eventoId};`;

    await connection.query(deletereportesquery);

    const deletequery = `
    delete from evento
    where id_evento = ${eventoId};`;

    const deleteresult = await connection.query(deletequery);

    if(deleteresult[0].affectedRows !== 1) {
      throw new Error("deletequery: No se han modificado eventos");
    }

    await connection.end();
  response.success = true;
    response.message = "Evento eliminado";
    response.data = deleteresult[0];
    return res.status(200).json(response);

  } catch (error) {
    console.error(error);
    response.success = false;
    response.message = error.message;
    response.data = null;
    return res.status(500).json(response);
    
  }
}