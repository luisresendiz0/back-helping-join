import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import useConnection from "../../../database";

const signupBeneficiado = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  const {
    email,
    contrasena,
    nombre,
    imagen,
    tipo,
    direccion,
    telefono,
    descripcion,
    responsable,
  } = req.body;

  if (
    !email ||
    !contrasena ||
    !nombre ||
    !imagen ||
    !tipo ||
    !direccion ||
    !telefono ||
    !descripcion ||
    !responsable
  ) {
    response.message = "Falta información";
    return res.status(400).json(response);
  }

  try {
    const connection = await useConnection();

    const select = `SELECT * FROM beneficiado WHERE email = '${email}';`;
    const result = await connection.query(select);

    if (result[0].length > 0) {
      response.message = "El usuario ya existe";
      return res.status(400).json(response);
    }

    const encryptedPassword = await bcrypt.hash(contrasena, 10);

    const insert = `INSERT INTO beneficiado (email, contrasena, nombre, imagen, tipo, direccion, telefono, descripcion, responsable, evento_eliminados) VALUES ('${email}', '${encryptedPassword}', '${nombre}', '${imagen}', '${tipo}', '${direccion}', '${telefono}', '${descripcion}', '${responsable}', '0');`;
    const usuario = await connection.query(insert);

    if (usuario[0].affectedRows === 0) {
      response.message = "Error al registrar el usuario";
      return res.status(500).json(response);
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    response.success = true;
    response.message = "Usuario registrado";
    response.data = { token };
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    response.message = "Error al registrar el usuario";
    return res.status(500).json(response);
  }
};

export default signupBeneficiado;
