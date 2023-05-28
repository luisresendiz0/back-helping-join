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

export const sendEmailPin = async (email, nombre, pin) => {
  const config = {
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "resendiz630547@gmail.com",
      pass: "njsmzkcqmiwcvkks",
    },
  };

  const message = {
    from: "Helping Join <helping.join@gmail.com>",
    to: email,
    subject: "Recuperación de contraseña - Información importante adjunta",
    html: `<p>Estimado/a <b>${nombre}</b>,</p>

    <p>Recientemente hemos recibido una solicitud de recuperación de contraseña para tu cuenta. este es el PIN necesario para completar el proceso de recuperación: ${pin}. Utiliza este código al restablecer tu contraseña siguiendo las instrucciones proporcionadas.</p>`,
  };

  const transporter = nodemailer.createTransport(config);

  try {
    const result = await transporter.sendMail(message);

    console.log(result.accepted);
  } catch (error) {
    console.log(error);
  }
};
