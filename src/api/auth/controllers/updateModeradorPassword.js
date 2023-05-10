import useConnection from "../../../database";
import bcrypt from "bcrypt";

const updateModeradorPassword = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const { id_moderador, contrasena } = req.body;

    if (!id_moderador || !contrasena) {
      throw new Error("Falta información");
    }

    const connection = await useConnection();
    const encryptedPassword = await bcrypt.hash(contrasena, 10);


    const query = `
    update moderador
    set contrasena = '${encryptedPassword}'
    where id_moderador = ${id_moderador};`;

    const [result] = await connection.query(query);

    if (result.affectedRows === 0) {
      throw new Error("No se pudo actualizar la contraseña");
    }

    await connection.end();
    response.success = true;
    response.message = "Contraseña actualizada correctamente";
    
    return res.status(200).json(response);

  } catch (error) {
    console.log(error);
    response.message = error.message;
    return res.status(400).json(response);
  }
}

export default updateModeradorPassword;