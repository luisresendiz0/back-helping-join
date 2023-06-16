import useConnection from "../../../database";
import { sendEmail, sendEmailPin } from "../../../services/emails";

const recoverPassword = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const { email, userType } = req.body;

    if (!email || !userType) {
      throw new Error("Faltan datos");
    }

    let table = ["civil", "organizacion"].includes(userType)
      ? "beneficiado"
      : "voluntario";

    const connection = await useConnection();

    let find = `SELECT * FROM ${table} WHERE email = '${email}';`;

    const result = await connection.query(find);

    if (result[0].length === 0) {
      await connection.end();
      throw new Error("No existe usuario");
    }

    const nombre = result[0][0].nombre;

    const pin = generarPIN();

    await sendEmailPin(email, nombre, pin);

    await connection.end();
    response.success = true;
    response.message =
      "Se ha enviado un correo electrónico con el PIN de recuperación";
    response.data = { pin };

    res.status(200).send(response);
  } catch (error) {
    response.message = error.message;
    res.status(400).send(response);
  }
};

export default recoverPassword;

function generarPIN() {
  let pin = "";
  for (let i = 0; i < 4; i++) {
    pin += Math.floor(Math.random() * 10);
  }
  return pin;
}
