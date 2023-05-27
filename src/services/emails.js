import nodemailer from "nodemailer";

export const sendEmail = async (email, nombre, id, type) => {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "resendiz630547@gmail.com",
      pass: "njsmzkcqmiwcvkks",
    },
  };

  const message = {
    from: "Helping Join <resendiz630547@gmail.com>",
    to: email,
    subject: "Verificación de correo electrónico - Acción requerida",
    html: `<p>Estimado/a <b>${nombre}</b>,</p>

    <p>Gracias por registrarte en nuestro servicio. Para garantizar la seguridad de tu cuenta y activarla por completo, requerimos que verifiques tu dirección de correo electrónico. Por favor da click en el siguiente enlace: <a href="${
      process.env.API_URL || "http://localhost:4000"
    }/api/auth/verify/${type}/${id}">Click aqui</a></p>`,
  };

  const transporter = nodemailer.createTransport(config);

  try {
    const result = await transporter.sendMail(message);

    console.log(result.accepted);
  } catch (error) {
    console.log(error);
  }
};
