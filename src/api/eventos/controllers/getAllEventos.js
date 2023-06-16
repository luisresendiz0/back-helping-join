import useConnection from "../../../database";

export const getAllEventos = async (req, res) => {
  const response = {
    success: false,
    message: "No se pudo obtener los eventos",
    data: [],
  };

  const query = `
	SELECT evento.*, beneficiado.nombre AS beneficiado_nombre, beneficiado.imagen AS beneficiado_imagen, beneficiado.tipo AS beneficiado_tipo, beneficiado.direccion AS beneficiado_direccion, beneficiado.telefono AS beneficiado_telefono, beneficiado.responsable AS beneficiado_responsable
	FROM evento
	LEFT JOIN beneficiado ON evento.id_beneficiado = beneficiado.id_beneficiado;`;

  try {
    const connection = await useConnection();
    const results = await connection.query(query);

    if (results[0]) {
      await connection.end();
      response.success = true;
      response.message = "Eventos obtenidos con éxito";
      response.data = results[0];

      res.status(200).json(response);
    } else {
      await connection.end();
      res.status(404).json(response);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(response);
  }
};
