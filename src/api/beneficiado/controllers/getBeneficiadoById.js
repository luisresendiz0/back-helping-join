import useConnection from "../../../database";

const getBeneficiadoById = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("Falta información");
    }

    const select = `SELECT * FROM beneficiado WHERE id_beneficiado = ${id};`;

    const connection = await useConnection();

    const [rows] = await connection.query(select);

    if (rows.length === 0) {
      await connection.end();
      throw new Error("No existe beneficiado");
    }

    response.success = true;
    response.message = "Beneficiado encontrado";
    response.data = rows[0];

    await connection.end();
    return res.status(200).json(response);
  } catch (error) {
    response.message = error.message;
    return res.status(400).json(response);
  }
};

export default getBeneficiadoById;
