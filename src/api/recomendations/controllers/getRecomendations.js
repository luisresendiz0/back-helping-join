import useConnection from "../../../database";


const getRecomendations = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: [],
  };

  const { voluntarioId } = req.query;

  const queryNormalizacion = `SELECT * FROM recomendacion WHERE id_voluntario = ${voluntarioId};`;

  try {
    const connection = await useConnection();

    const resultNormalizacion = await connection.query(queryNormalizacion);

    const recomendations = JSON.parse(resultNormalizacion[0][0].recomendacion);

    let ids = "(";

    recomendations.forEach(r => {
      ids += r.id_evento + ",";
    });

    ids = ids.slice(0, -1);
    ids += ")";

    const queryRecomendaciones = `SELECT * FROM evento WHERE id_evento IN ${ids};`;

    const resultRecomendaciones = await connection.query(queryRecomendaciones);

    const unsortedEventos = resultRecomendaciones[0];

    const sortedEventos = recomendations.map(r => unsortedEventos.find(e => e.id_evento === r.id_evento));

    response.success = true;
    response.message = "Recomendaciones generadas";
    response.data = sortedEventos;
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = error.message;
    res.status(500).json(response);
  }
}

export default getRecomendations;