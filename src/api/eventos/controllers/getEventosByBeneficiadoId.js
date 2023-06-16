import useConnection from "../../../database";

export const getEventosByBeneficiadoId = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: [],
  };

  try {
    const { beneficiadoId } = req.params;

    if (!beneficiadoId) {
      throw new Error("No se recibió el id del beneficiado");
    }

    const connection = await useConnection();

    const select = `
    SELECT * 
    FROM evento
    WHERE id_beneficiado = ${beneficiadoId}
    ORDER BY id_evento DESC;`;

    const [rows] = await connection.query(select);

    response.success = true;
    response.message = "Eventos obtenidos";
    response.data = rows;

    await connection.end();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = "Error al obtener los eventos";
    return res.status(500).json(response);
  }
};
