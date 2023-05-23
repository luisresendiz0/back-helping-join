import useConnection from "../../../database";
import bcrypt from "bcrypt";

const updatePassword = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  }

  const { beneficiadoId, password, newPassword } = req.body;

  try {
    if (!beneficiadoId || !password || !newPassword) {
      throw new Error("Falta información");
    }

    const connection = await useConnection();

    const select = `SELECT * FROM beneficiado WHERE id_beneficiado = ${beneficiadoId};`;

    const selectResult = await connection.query(select);

    if (selectResult[0].length === 0) {
      throw new Error("El usuario no existe");
    }

    const user = selectResult[0][0];

    const match = await bcrypt.compare(password, user.contrasena);

    if (!match) {
      throw new Error("Contraseña incorrecta");
    }

    const hash = await bcrypt.hash(newPassword, 10);

    const update = `UPDATE beneficiado SET contrasena = '${hash}' WHERE id_beneficiado = ${beneficiadoId};`;

    await connection.query(update);

    await connection.end();

    response.success = true;
    response.message = "Contraseña actualizada correctamente";

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = error.message;
    return res.status(500).json(response);
  }
    
}

export default updatePassword;