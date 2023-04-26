import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import useConnection from "../../../database";

const signinVoluntario = async (req, res, next) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    response.message = "Falta información";
    return res.status(400).json(response);
  }

  try {
    const connection = await useConnection();

    const select = `SELECT * FROM voluntario WHERE email = '${email}';`;
    const result = await connection.query(select);

    if (result[0].length > 0) {
      const usuario = result[0][0];

      const passwordMatch = await bcrypt.compare(
        contrasena,
        usuario.contrasena
      );

      if (passwordMatch) {
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        usuario.contrasena = null;

        response.success = true;
        response.message = "Usuario autenticado correctamente";
        response.data = {
          token,
          usuario,
        };

        return res.status(200).json(response);
      } else {
        response.message = "Contraseña incorrecta";
        return res.status(400).json(response);
      }
    } else {
      response.message = "El usuario no existe";
      return res.status(400).json(response);
    }
  } catch (error) {
    response.message = "Error al autenticar el usuario";
    return res.status(500).json(response);
  }
};

export default signinVoluntario;
