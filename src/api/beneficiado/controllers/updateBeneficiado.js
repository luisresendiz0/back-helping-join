import useConnection from "../../../database";
import { sendEmail } from "../../../services/emails";

const updateBeneficiado = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const {
      beneficiadoId,
      nombre,
      email,
      imagen,
      calle,
      numero_exterior,
      numero_interior,
      colonia,
      alcaldia,
      codigo_postal,
      entidad,
      telefono,
      descripcion,
      facebook,
      instagram,
      twitter,
      web,
    } = req.body;

    const connection = await useConnection();

    let find = `SELECT * FROM beneficiado WHERE id_beneficiado = '${beneficiadoId}';`;

    const findResult = await connection.query(find);

    if (findResult[0].length === 0) {
      await connection.end();
      throw new Error("No existe beneficiado");
    }

    let verificado = "verificado = 1";

    if (findResult[0][0].email !== email) {
      verificado = "verificado = 0";
      await sendEmail(
        email,
        nombre,
        findResult[0][0].id_beneficiado,
        "beneficiado"
      );
    }

    let update = `
    UPDATE beneficiado 
    SET 
      calle = '${calle}', 
      numero_exterior = '${numero_exterior}', 
      numero_interior = '${numero_interior}', 
      colonia = '${colonia}', 
      alcaldia = '${alcaldia}', 
      codigo_postal = '${codigo_postal}', 
      entidad = '${entidad}', 
      telefono = '${telefono}', 
      descripcion = '${descripcion}',
      nombre = '${nombre}',
      email = '${email}',
      facebook = '${facebook}',
      instagram = '${instagram}',
      twitter = '${twitter}',
      web = '${web}'`;

    update += `, ${verificado}`;

    if (
      imagen &&
      imagen !== "null" &&
      imagen !== "undefined" &&
      imagen !== "false" &&
      imagen !== "true" &&
      imagen !== {} &&
      imagen !== [] &&
      typeof imagen !== "object"
    ) {
      update += `, imagen = '${imagen}'`;
    }

    const where = ` WHERE id_beneficiado = '${beneficiadoId}';`;

    update += where;

    const result = await connection.query(update);

    if (result[0].affectedRows !== 1) {
      await connection.end();
      response.message = "No se pudo actualizar el beneficiado";
      return res.status(400).json(response);
    }

    const select = `SELECT * FROM beneficiado WHERE id_beneficiado = '${beneficiadoId}';`;

    const data = await connection.query(select);

    response.success = true;
    response.message = "Beneficiado actualizado";
    response.data = data[0][0];

    await connection.end();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = "No se pudo actualizar el beneficiado";
    res.status(400).json(response);
  }
};

export default updateBeneficiado;
