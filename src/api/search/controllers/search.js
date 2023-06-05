import useConnection from "../../../database";
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const search = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  const {
    text, // texto a buscar
    type, // 'eventos', 'organizaciones', 'civiles'
  } = req.body;
  console.log(text)
  try {

    const eventosQuery = `
      SELECT e.*, GROUP_CONCAT(c.nombre SEPARATOR ', ') AS categorias
      FROM evento e
      INNER JOIN evento_categoria ec ON e.id_evento = ec.id_evento
      INNER JOIN categoria c ON ec.id_categoria = c.id_categoria
      ${
        text
          ? `WHERE (e.nombre LIKE '%${text}%' OR e.descripcion LIKE '%${text}%')`
          : ""
      }
      GROUP BY e.id_evento;
    `;

    const organizacionesQuery = `
      SELECT b.*, GROUP_CONCAT(c.nombre SEPARATOR ', ') AS categorias
      FROM beneficiado b
      INNER JOIN beneficiado_categoria bc ON b.id_beneficiado = bc.id_beneficiado
      INNER JOIN categoria c ON bc.id_categoria = c.id_categoria
      WHERE
      ${
        text
          ? `(b.nombre LIKE '%${text}%' OR b.descripcion LIKE '%${text}%' OR b.responsable LIKE '%${text}%') AND`
          : ""
      }
        b.tipo = 'organizacion'
      GROUP BY b.id_beneficiado;
    `;

    const civilesQuery = `
      SELECT b.*, GROUP_CONCAT(c.nombre SEPARATOR ', ') AS categorias
      FROM beneficiado b
      INNER JOIN beneficiado_categoria bc ON b.id_beneficiado = bc.id_beneficiado
      INNER JOIN categoria c ON bc.id_categoria = c.id_categoria
      WHERE
      ${
        text
          ? `(b.nombre LIKE '%${text}%' OR b.descripcion LIKE '%${text}%' OR b.responsable LIKE '%${text}%') AND`
          : ""
      }
        b.tipo = 'civil'
      GROUP BY b.id_beneficiado;
    `;

    const connection = await useConnection();

    let eventos = []
    let organizaciones = []
    let civiles = []

    if(type.includes("eventos") || type.includes("all")) {
      const eventosResult = await connection.query(eventosQuery);
      eventos = eventosResult[0];
    }

    if(type.includes("organizaciones") || type.includes("all")) {
      const organizacionesResult = await connection.query(organizacionesQuery);
      organizaciones = organizacionesResult[0];
    }

    if(type.includes("civiles") || type.includes("all")) {
      const civilesResult = await connection.query(civilesQuery);
      civiles = civilesResult[0];
    }

    await connection.end();
    response.success = true;
    response.message = "Busqueda exitosa";
    response.data = {
      eventos,
      organizaciones,
      civiles
    };
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    response.success = false;
    response.message = "No se pudo realizar la busqueda";
    response.data = [];
    return res.status(500).json(response);
  }
};
