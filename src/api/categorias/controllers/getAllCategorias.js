import useConnection from "../../../database";

export const getAllCategorias = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: [],
  };

  const query = "SELECT * FROM categoria";

  try {
    const connection = await useConnection();

    const [rows] = await connection.query(query);

    if (rows.length === 0) {
      await connection.end();
      throw new Error("No se encontraron categorias");
    }

    response.success = true;
    response.message = "Categorias encontradas";
    response.data = rows;

    await connection.end();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = error.message;
    response.data = [];
    res.status(400).json(response);
  }
};
