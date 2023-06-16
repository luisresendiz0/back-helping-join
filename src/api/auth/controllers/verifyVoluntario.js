import useConnection from "../../../database";
import template from "../../../services/template";

const verifyVoluntario = async (req, res) => {
  const response = {
    success: false,
    message: "",
  };

  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("Falta información");
    }

    const connection = await useConnection();

    const update = `UPDATE voluntario SET verificado = 1 WHERE id_voluntario = ${id};`;

    await connection.query(update);

    response.success = true;
    response.message = "Usuario verificado";

    await connection.end();
    return res.status(200).send(template);
  } catch (error) {
    response.message = error.message;
    return res.status(400).send(JSON.stringify(response, null, 2));
  }
};

export default verifyVoluntario;
