import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import useConnection from "../../../database";
import { sendEmail } from "../../../services/emails";

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
    calle,
    numero_exterior,
    numero_interior,
    colonia,
    alcaldia,
    codigo_postal,
    entidad,
    telefono,
    descripcion,
    responsable,
    categorias,
  } = req.body;

  if (
    !email ||
    !contrasena ||
    !nombre ||
    !tipo ||
    !calle ||
    !numero_exterior ||
    !colonia ||
    !alcaldia ||
    !codigo_postal ||
    !entidad ||
    !telefono ||
    // !descripcion ||
    !responsable ||
    !categorias
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

    // INSERT INTO db_helping_join.beneficiado (nombre, imagen, tipo, calle, numero_exterior, numero_interior, colonia, alcaldia, codigo_postal, entidad, telefono, descripcion, responsable, email, contrasena, evento_eliminados) VALUES('', NULL, '', '', '', NULL, '', '', '', '', '', '', '', '', '', 0);
    const insert = `INSERT INTO beneficiado (
      nombre, 
      imagen, 
      tipo, 
      calle, 
      numero_exterior, 
      numero_interior, 
      colonia, 
      alcaldia, 
      codigo_postal, 
      entidad, 
      telefono, 
      descripcion, 
      responsable, 
      email, 
      contrasena, 
      evento_eliminados
    ) VALUES(
      '${nombre}', 
      '${imagen}', 
      '${tipo}', 
      '${calle}', 
      '${numero_exterior}', 
      '${numero_interior}', 
      '${colonia}', 
      '${alcaldia}', 
      '${codigo_postal}', 
      '${entidad}', 
      '${telefono}', 
      '${descripcion}', 
      '${responsable}', 
      '${email}', 
      '${encryptedPassword}', 
      0);`;

    const usuario = await connection.query(insert);

    if (usuario[0].affectedRows === 0) {
      response.message = "Error al registrar el usuario";
      return res.status(500).json(response);
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    let queryCategorias = `INSERT INTO beneficiado_categoria (id_beneficiado, id_categoria) VALUES `;

    categorias.forEach((categoria) => {
      queryCategorias += `(${usuario[0].insertId}, ${categoria}), `;
    });

    queryCategorias = queryCategorias.slice(0, -2);
    queryCategorias += `;`;

    const resultCateagorias = await connection.query(queryCategorias);

    if (resultCateagorias[0].affectedRows !== categorias.length) {
      throw new Error("Error al registrar las categorias");
    }

    const getUser = `SELECT * FROM beneficiado WHERE id_beneficiado = ${usuario[0].insertId};`;

    const [rows] = await connection.query(getUser);

    if (rows.length === 0) {
      throw new Error("No se encontró el usuario");
    }

    await connection.end();

    await sendEmail(email, responsable, usuario[0].insertId, "beneficiado");

    response.success = true;
    response.message = "Usuario registrado";
    response.data = { token, beneficiado: rows[0] };
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    response.message = "Error al registrar el usuario";
    return res.status(500).json(response);
  }
};

export default signupBeneficiado;
