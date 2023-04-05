import useConnection from "../../../database";

const modificarCategorias = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  const { beneficiadoId, categorias } = req.body;

  if (!beneficiadoId) {
    response.message = "No se envio el id del beneficiado";
    return res.status(400).json(response);
  }

  if (!categorias || categorias.length !== 18) {
    response.message = "No se enviaron las categorias correctamente";
    return res.status(400).json(response);
  }

  try {
    const connection = await useConnection();

    const remove = `DELETE FROM beneficiado_categoria WHERE id_beneficiado = ${beneficiadoId};`;
    await connection.query(remove);

    const promises = categorias.map((categoria, index) => {
      // [0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]
      const insert = `INSERT INTO beneficiado_categoria (id_beneficiado, id_categoria) VALUES (${beneficiadoId}, ${
        index + 1
      });`;

      return categoria ? connection.query(insert) : null;
    });

    await Promise.all(promises);

    response.success = true;
    response.message = "Categorias modificadas correctamente";
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = "Ocurrio un error al modificar las categorias";
    return res.status(500).json(response);
  }
};

export default modificarCategorias;
