import jwt from "jsonwebtoken";

const requireToken = async (req, res, next) => {
  const response = {
    success: false,
    message: "",
    data: null,
  };

  const token = `${req.headers["authorization"]}`;

  if (!token || token.split(" ").length !== 2) {
    response.message = "No se ha proporcionado un token válido";
    return res.status(401).json(response);
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.email = decoded.email;
    next();
  } catch (error) {
    response.message = "No se ha proporcionado un token válido";
    return res.status(401).json(response);
  }
};

export default requireToken;
