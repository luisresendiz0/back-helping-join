import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import useConnection from "../../../database";

const signupVoluntario = async (req, res) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  const {
    nombre, edad, email, calle, numero_exterior, numero_interior, colonia, alcaldia, codigo_postsl, entidad, imagen, contrasena, categorias
  } = req.body;

  if (
    !nombre || !edad || !email || !calle || !numero_exterior || !colonia || !alcaldia || !codigo_postsl || !entidad || !contrasena || !categorias
  ) {
    response.message = "Falta información";
    return res.status(400).json(response);
  }

  try {
    const connection = await useConnection();

    const select = `SELECT * FROM voluntario WHERE email = '${email}';`;
    const result = await connection.query(select);

    if (result[0].length > 0) {
      response.message = "El usuario ya existe";
      return res.status(400).json(response);
    }

    const encryptedPassword = await bcrypt.hash(contrasena, 10);

    const insert = `
    INSERT INTO voluntario (
      nombre, 
      edad, 
      email, 
      calle, 
      numero_exterior, 
      numero_interior, 
      colonia, 
      alcaldia, 
      codigo_postsl, 
      entidad, 
      imagen, 
      contrasena
    ) 
    VALUES(
      '${nombre}', 
      '${edad}', 
      '${email}', 
      '${calle}', 
      '${numero_exterior}',  
      '${numero_interior ?? 'NULL'}', 
      '${colonia}', 
      '${alcaldia}',  
      '${codigo_postsl}', 
      '${entidad}', 
      '${imagen ?? 'NULL'}',   
      '${encryptedPassword}'
    );`;
    const usuario = await connection.query(insert);

    if (usuario[0].affectedRows !== 1) {
      response.message = "Error al registrar el usuario";
      return res.status(500).json(response);
    }

    let queryCategorias = `INSERT INTO voluntario_categoria (id_voluntario, id_categoria) VALUES `;

    categorias.forEach(categoria => {
      queryCategorias += `(${usuario[0].insertId}, ${categoria}), `;
    })

    queryCategorias = queryCategorias.slice(0, -2);
    queryCategorias += `;`;

    const resultCateagorias = await connection.query(queryCategorias);

    if (resultCateagorias[0].affectedRows !== categorias.length) {
      response.message = "Error al registrar las categorías";
      return res.status(500).json(response);
    }

    // categorias = [1, 4, 7, 10]
    const cats = Array(18).fill(0);

    categorias.forEach((categoria) => {
      cats[categoria - 1] = 1;
    });

    const findEventos = `SELECT COUNT(*) AS total FROM evento WHERE fecha_fin > ${Date.now()};`
    const eventos = await connection.query(findEventos);

    const N = eventos[0][0].total;

    const aprioriProbability = 1 / N;

    const getNormalization = `
    SELECT normalizacion.matriz, normalizacion.id_evento FROM normalizacion INNER JOIN evento ON evento.id_evento = normalizacion.id_evento WHERE fecha_fin > ${Date.now()};`
    const normalizacionesResult = await connection.query(getNormalization);

    let normalizaciones = normalizacionesResult[0];

    console.log(categorias);

    for(let i = 0; i < normalizaciones.length; i++) {
      normalizaciones[i].matriz = JSON.parse(normalizaciones[i].matriz)
      let total = 1;
      for(let j = 0; j < cats.length; j++) {
        total *= normalizaciones[i].matriz[cats[j]][j];
      }

      total *= aprioriProbability;
      normalizaciones[i].total = total;
    }

    normalizaciones = normalizaciones.map(({ total, id_evento }) => ({ total: total *= 10000, id_evento })).sort((a, b) => {
      return b.total - a.total;
    }).slice(0, 10);

    const insertNormalizacion = `
    INSERT INTO recomendacion (id_voluntario, recomendacion) VALUES(${usuario[0].insertId}, '${JSON.stringify(normalizaciones)}');`

    const resultNormalizacion = await connection.query(insertNormalizacion);

    if(resultNormalizacion[0].affectedRows !== 1) {
      throw new Error("No se pudo insertar la normalizacion");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const getUser = `SELECT * FROM voluntario WHERE email = '${email}';`;
    const [user] = await connection.query(getUser);

    if (user.length !== 1) {
      response.message = "Error al registrar el usuario";
      return res.status(500).json(response);
    }

    await connection.end();
    response.success = true;
    response.message = "Usuario registrado";
    response.data = { token, voluntario: user[0] };
    return res.status(201).json(response);
  } catch (error) {
    console.log(error);
    response.message = "Error al registrar el usuario";
    return res.status(500).json(response);
  }
};

export default signupVoluntario;
