import useConnection from "../../../database";

const getVoluntarioById = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const { voluntarioId } = req.params;

    const connection = await useConnection();

    const select = `SELECT * FROM voluntario WHERE id_voluntario = '${voluntarioId}';`;

    const result = await connection.query(select);

    if (result[0].length !== 1) {
      await connection.end();
      throw new Error("No se encontró el voluntario");
    }

    response.success = true;
    response.message = "Voluntario encontrado";
    response.data = result[0][0];

    await connection.end();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = error.message;
    return res.status(500).json(response);
  }
};

export default getVoluntarioById;
