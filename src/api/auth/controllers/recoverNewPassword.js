import useConnection from "../../../database";
import bcrypt from "bcrypt";

const recoverNewPassword = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const { email, userType, password } = req.body;

    if (!email || !userType || !password) {
      throw new Error("Faltan datos");
    }

    let table = ["civil", "organizacion"].includes(userType)
      ? "beneficiado"
      : "voluntario";

    const connection = await useConnection();

    let find = `SELECT * FROM ${table} WHERE email = '${email}';`;

    const result = await connection.query(find);

    if (result[0].length === 0) {
      throw new Error("No existe usuario");
    }

    const id = result[0][0].id_beneficiado || result[0][0].id_voluntario;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const update = `UPDATE ${table} SET contrasena = '${encryptedPassword}' WHERE id_${table} = '${id}';`;

    await connection.query(update);

    await connection.end();
    response.success = true;
    response.message = "Se ha actualizado la contraseña";

    res.status(200).send(response);
  } catch (error) {
    response.message = error.message;
    res.status(400).send(response);
  }
};

export default recoverNewPassword;
