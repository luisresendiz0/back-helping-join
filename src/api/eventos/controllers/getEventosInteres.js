import useConnection from "../../../database";

export const getEventosInteres = async (req, res) => {
  const response = {
    success: false,
    message: '',
    data: null
  }

  try {
    const { id_voluntario } = req.query;

    if(!id_voluntario) {
      throw new Error('No se ha enviado el id_voluntario');
    }

    const connection = await useConnection();

    const query = `
    select e.*
    from evento e
    inner join evento_voluntario ev on ev.id_evento = e.id_evento 
    where ev.id_voluntario = ${id_voluntario}
    and e.fecha_fin >= now();`

    const [eventos] = await connection.query(query);

    await connection.end();
    response.success = true;
    response.message = 'Eventos obtenidos correctamente';
    response.data = eventos;

    return res.status(200).json(response);

  } catch (error) {
    console.log(error);
    response.message = error.message;
    return res.status(400).json(response);
  }
}