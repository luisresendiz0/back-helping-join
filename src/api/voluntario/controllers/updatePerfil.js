import useConnection from "../../../database";

const updatePerfil = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  try {
    const {
      voluntarioId,
      imagen,
      email,
      nombre,
      calle,
      numero_exterior,
      numero_interior,
      colonia,
      alcaldia,
      codigo_postsl,
      entidad,
    } = req.body;

    const connection = await useConnection();

    let update = `
    UPDATE voluntario
    SET
      calle = '${calle}',
      numero_exterior = '${numero_exterior}',
      numero_interior = '${numero_interior}',
      colonia = '${colonia}',
      alcaldia = '${alcaldia}',
      codigo_postsl = '${codigo_postsl}',
      entidad = '${entidad}',
      nombre = '${nombre}',
      email = '${email}'`;

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

    const where = ` WHERE id_voluntario = '${voluntarioId}';`;

    update += where;

    const result = await connection.query(update);

    if (result[0].affectedRows !== 1) {
      throw new Error("No se pudo actualizar el voluntario");
    }

    const select = `SELECT * FROM voluntario WHERE id_voluntario = '${voluntarioId}';`;

    const data = await connection.query(select);

    response.success = true;
    response.message = "Voluntario actualizado";
    response.data = data[0][0];

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    response.message = error.message;
    return res.status(500).json(response);
  }
};

export default updatePerfil;
