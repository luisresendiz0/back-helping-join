import useConnection from "../../../database";

export const updateEventoInterest = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null
  }

  const { id_evento, id_voluntario } = req.body;

  if(!id_evento || !id_voluntario) {
    response.message = "No se recibieron los datos necesarios";
    return res.status(400).json(response);
  }

  try {
    const connection = await useConnection();

    const eventoExist = await connection.query(`SELECT * FROM evento WHERE id_evento = ${id_evento};`);
    const voluntarioExist = await connection.query(`SELECT * FROM voluntario WHERE id_voluntario = ${id_voluntario};`);

    if(eventoExist[0].length === 0) {
      throw new Error("No existe el evento");
    }

    if(voluntarioExist[0].length === 0) {
      throw new Error("No existe el voluntario");
    }

    const query = `INSERT INTO evento_voluntario (id_evento, id_voluntario) VALUES (${id_evento}, ${id_voluntario});`;

    const result = await connection.query(query);

    if(result[0].affectedRows !== 1) {
      throw new Error("No se pudo agregar el voluntario al evento");
    }

    response.success = true;
    response.message = "Voluntario agregado al evento";
    response.data = null;

    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = error.message;
    response.data = null;
    res.status(500).json(response);
    
  }
}