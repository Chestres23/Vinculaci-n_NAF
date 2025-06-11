const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // debe ser una contraseña de aplicación
  },
});

const enviarCorreoAsesoria = async (asesoria) => {
  const mailOptions = {
    from: `"NAF ESPE" <${process.env.GMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL || process.env.GMAIL_USER,
    subject: "📝 Nueva solicitud de asesoría",

    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="background-color: #006400; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">📩 Nueva Asesoría Registrada</h2>
          </div>
          <div style="padding: 20px;">
            <p><strong>Nombre:</strong> ${asesoria.Nombre}</p>
            <p><strong>Correo:</strong> ${asesoria.Correo}</p>
            <p><strong>Teléfono:</strong> ${asesoria.Telefono}</p>
            <p><strong>Ciudad:</strong> ${asesoria.Ciudad}</p>
            <p><strong>Tipo de Servicio:</strong> ${asesoria.TipoServicio}</p>
            <p><strong>Tipo de Contribuyente:</strong> ${asesoria.TipoContribuyente}</p>
            <p><strong>Discapacidad:</strong> ${asesoria.Discapacidad ? "Sí" : "No"}</p>
            <p><strong>Medio de Contacto:</strong> ${asesoria.MedioContacto}</p>
            <p><strong>Detalle de la Solicitud:</strong></p>
            <div style="background-color: #f0f0f0; padding: 10px; border-left: 4px solid #006400; margin-top: 10px;">
              ${asesoria.DetalleSolicitud}
            </div>
            <p style="margin-top: 20px;">Puedes revisar esta solicitud directamente en el sistema.</p>
          </div>
          <div style="background-color: #f9f9f9; text-align: center; padding: 10px; font-size: 12px; color: #777;">
            Núcleo de Apoyo Contable y Fiscal - ESPE
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const enviarCorreoUsuario = async (asesoria) => {
  const mailOptions = {
    from: `"NAF ESPE" <${process.env.GMAIL_USER}>`,
    to: asesoria.Correo, // 📬 correo del solicitante
    subject: "✅ Asesoría registrada - NAF ESPE",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="background-color: #006400; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">🎉 Asesoría registrada</h2>
          </div>
          <div style="padding: 20px;">
            <p>Estimado/a <strong>${asesoria.Nombre}</strong>,</p>
            <p>Gracias por solicitar una asesoría con el Núcleo de Apoyo Contable y Fiscal (NAF - ESPE).</p>
            <p>Hemos recibido tu solicitud con los siguientes datos:</p>
            <ul>
              <li><strong>Ciudad:</strong> ${asesoria.Ciudad}</li>
              <li><strong>Tipo de Servicio:</strong> ${asesoria.TipoServicio}</li>
              <li><strong>Medio de Contacto:</strong> ${asesoria.MedioContacto}</li>
            </ul>
            <p>📬 Pronto nos comunicaremos contigo a través del medio seleccionado.</p>
            <p>Si tienes alguna inquietud adicional, no dudes en responder este correo.</p>
            <p>Gracias por confiar en NAF ESPE.</p>
          </div>
          <div style="background-color: #f9f9f9; text-align: center; padding: 10px; font-size: 12px; color: #777;">
            Núcleo de Apoyo Contable y Fiscal - ESPE
          </div>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const enviarCorreoConfirmacionRealizada = async (asesoria) => {
  const mailOptions = {
    from: `"NAF ESPE" <${process.env.GMAIL_USER}>`,
    to: asesoria.Correo,
    subject: "✅ Asesoría realizada - NAF ESPE",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <div style="background-color: #006400; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0;">🎯 Asesoría completada</h2>
          </div>
          <div style="padding: 20px;">
            <p>Estimado/a <strong>${asesoria.Nombre}</strong>,</p>
            <p>Te informamos que tu solicitud de asesoría ha sido marcada como <strong>realizada</strong>.</p>
            <p>Gracias por confiar en nosotros. Si tienes más dudas o deseas una nueva asesoría, no dudes en contactarnos nuevamente.</p>
            <p>Saludos,<br/>Equipo NAF - ESPE</p>
          </div>
          <div style="background-color: #f9f9f9; text-align: center; padding: 10px; font-size: 12px; color: #777;">
            Núcleo de Apoyo Contable y Fiscal - ESPE
          </div>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};


module.exports = { enviarCorreoAsesoria, enviarCorreoUsuario, enviarCorreoConfirmacionRealizada };
