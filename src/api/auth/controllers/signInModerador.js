import useConnection from "../../../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signInModerador = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      throw new Error("Falta información");
    }

    const connection = await useConnection();

    const query = `
    select *
    from moderador
    where email = '${email}'`;

    const [rows] = await connection.query(query);

    if (rows.length === 0) {
      throw new Error("El usuario no existe");
    }

    const user = rows[0];

    if (user.contrasena === "Cambiame1") {
      throw new Error(
        "Es necesario cambiar la contraseña:" + user.id_moderador
      );
    }

    const isValidPassword = await bcrypt.compare(contrasena, user.contrasena);

    if (!isValidPassword) {
      throw new Error("Contraseña incorrecta");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    user.contrasena = null;

    response.success = true;
    response.message = "Usuario autenticado correctamente";
    response.data = {
      token,
      moderador: user,
    };

    await connection.end();
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = error.message;
    return res.status(400).json(response);
  }
};

export default signInModerador;
