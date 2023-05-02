import useConnection from "../../../database";

export const getEventoById = async (req, res) => {
  const response = {
    success: false,
    message: "No se pudo obtener el evento",
    data: null
  }
  try {
    
    const { id } = req.params;

    if(!id) {
      throw new Error("No se recibió el id del evento");
    }

    const connection = await useConnection();

    const query = `SELECT * FROM evento WHERE id_evento = ${id};`;

    const result = await connection.query(query);

    if(result[0].length === 0) {
      throw new Error("No se encontró el evento");
    }

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