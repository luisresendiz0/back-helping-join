import useConnection from "../../../database";
import bcrypt from "bcrypt";

const updatePassword = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  const { voluntarioId, password, newPassword } = req.body;

  try {
    if (!voluntarioId || !password || !newPassword) {
      throw new Error("Falta información");
    }

    const connection = await useConnection();

    const select = `SELECT * FROM voluntario WHERE id_voluntario = ${voluntarioId};`;

    const selectResult = await connection.query(select);

    if (selectResult[0].length === 0) {
      await connection.end();
      throw new Error("El usuario no existe");
    }

    const user = selectResult[0][0];

    const match = await bcrypt.compare(password, user.contrasena);

    if (!match) {
      await connection.end();
      throw new Error("Contraseña incorrecta");
    }

    const hash = await bcrypt.hash(newPassword, 10);

    const update = `UPDATE voluntario SET contrasena = '${hash}' WHERE id_voluntario = ${voluntarioId};`;

    await connection.query(update);

    response.success = true;
    response.message = "Contraseña actualizada correctamente";

    await connection.end();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = error.message;
    return res.status(500).json(response);
  }
};

export default updatePassword;
