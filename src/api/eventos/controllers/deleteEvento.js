import useConnection from "../../../database";

export const deleteEvento = async (req, res) => {
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

    const connection = await useConnection();

    const getquery = `
    select id_beneficiado
    from evento
    where id_evento = ${eventoId};`;

    const getresult = await connection.query(getquery);

    if (getresult[0].length !== 1) {
      await connection.end();
      throw new Error("getquery: No se han modificado eventos");
    }

    const beneficiadoId = getresult[0][0].id_beneficiado;

    const addquery = `
    update beneficiado
    set evento_eliminados = evento_eliminados + 1
    where id_beneficiado = ${beneficiadoId};`;

    const addresult = await connection.query(addquery);

    if (addresult[0].affectedRows !== 1) {
      await connection.end();
      throw new Error("addquery: No se han modificado eventos");
    }

    const deletecatsquery = `
    delete from evento_categoria
    where id_evento = ${eventoId};`;

    const deletecatsresult = await connection.query(deletecatsquery);

    if (deletecatsresult[0].affectedRows === 0) {
      await connection.end();
      throw new Error("deletecatsquery: No se han modificado eventos");
    }

    const deletevoluntariosquery = `
    delete from evento_voluntario
    where id_evento = ${eventoId};`;

    await connection.query(deletevoluntariosquery);

    const deletenormalizacionquery = `
    delete from normalizacion
    where id_evento = ${eventoId};`;

    const deletenormalizacionresult = await connection.query(
      deletenormalizacionquery
    );

    if (deletenormalizacionresult[0].affectedRows !== 1) {
      await connection.end();
      throw new Error(
        "deletenormalizacioneventoquery: No se han modificado eventos"
      );
    }

    const deletereportesquery = `
    delete from reporte
    where id_evento = ${eventoId};`;

    const deletereportesresult = await connection.query(deletereportesquery);

    if (deletereportesresult[0].affectedRows === 0) {
      await connection.end();
      throw new Error("deletereportesquery: No se han modificado eventos");
    }

    const deletequery = `
    delete from evento
    where id_evento = ${eventoId};`;

    const deleteresult = await connection.query(deletequery);

    if (deleteresult[0].affectedRows !== 1) {
      await connection.end();
      throw new Error("deletequery: No se han modificado eventos");
    }

    response.success = true;
    response.message = "Evento eliminado";
    response.data = deleteresult[0];

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
