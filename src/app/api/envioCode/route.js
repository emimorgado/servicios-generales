import { client } from "@/lib/bd";
import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/config/mailer";

/**
 * Función para enviar un correo electrónico con un código
 * @param {string} Correo - Dirección de correo electrónico
 * @param {string} code - Código a enviar
 * @param {string} Nombres - Nombre del usuario
 * @param {string} Apellidos - Apellido del usuario
 */
async function sendVerificationEmail(Correo, code, Nombres, Apellidos) {
  try {
    // Configurar los detalles del correo
    const mailOptions = {
      to: Correo, // Dirección de correo del destinatario
      subject: "Código de verificación", // Asunto del correo
      html: `
  <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f7f7f7;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            .header {
            position: relative; /* Permite posicionamiento absoluto del logo */
                background-color: #818cf8;
                color: #ffffff;
                text-align: center;
                padding: 20px;
                text-align: center; /* Centra el texto horizontalmente */
            }
                .header img {
            position: absolute; /* Posiciona el logo */
            left: 20px; /* Separación del borde izquierdo */
            top: 50%; /* Centrado vertical relativo al contenedor */
            transform: translateY(-50%); /* Alineación perfecta del centro vertical */
            max-width: 40px; /* Tamaño máximo del logo */
        }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content p {
                font-size: 16px;
                line-height: 1.5;
            }
            .code {
                font-size: 24px;
                font-weight: bold;
                color: #6366f1;
                margin: 20px 0;
            }
            .footer {
                background-color: #f1f1f1;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #666;
            }
            .footer a {
                color: #0078D7;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="https://scontent.fccs9-1.fna.fbcdn.net/v/t39.30808-6/469005697_1817844599040513_8571523151537626623_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cEpGRKF9gwEQ7kNvgHh1up0&_nc_zt=23&_nc_ht=scontent.fccs9-1.fna&_nc_gid=AV05iRxaKcHYBbg2zGvHcHL&oh=00_AYAA-IJ2Y72dBzzHLRWe9PgJEq7OuTaTN0qEpSyII6oY6g&oe=6754286C" alt="Logo ServiExpress">
            <h2>¡Código de verificación ServiExpress!</h2>
        </div>
            <!-- Content -->
        <div class="content">
            <h1>Hola, ${Nombres} ${Apellidos}! </h1>
            <p>
                <p>Has solicitado cambiar tu contraseña. Usa el siguiente código de verificación para completar el proceso:</p>
                 ${code}
                <p>Si no solicitaste este cambio, puedes ignorar este mensaje. Tu contraseña no será modificada.</p>
                <p>Gracias por usar nuestros servicios,<br>El equipo de ServiExpress.</p>
            </div>
     <!-- Footer -->
        <div class="footer">
            <p>© 2024 ServiExpress. Todos los derechos reservados.</p>
                <p>Este correo es generado automáticamente, por favor no respondas.</p>
                <p>¿Necesitas ayuda? <a href="serviExpressme@gmail.com">Contáctanos</a></p>
        </div>
    </div>
</body>
</html>
      `,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${Correo} con el código ${code}`);

    // Guardar el código en la base de datos
    const insertQuery = `
    INSERT INTO PasswordRecovery (Correo, Code, CreatedAt)
    VALUES (?, ?, CURRENT_TIMESTAMP)
  `;
    await client.query(insertQuery, [Correo, code]);
    console.log(`Código ${code} guardado en la base de datos para ${Correo}`);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    throw error;
  }
}

/**
 * @param {NextRequest} request
 */
export async function POST(request) {
  const body = await request.json();
  const { Correo } = body;

  try {
    // Verificar si el correo electrónico existe en la base de datos
    const query = `
    SELECT Nombres, Apellidos 
    FROM personas
    WHERE Correo = ?
  `;
    const [rows] = await client.query(query, [Correo]);

    if (rows.length === 0) {
      // Si el correo electrónico no existe en la base de datos, enviamos una respuesta de error
      return NextResponse.json(
        { error: "El correo electrónico no ha sido encontrado" },
        { status: 404 }
      );
    }

    const { Nombres, Apellidos } = rows[0]; // Obtener nombres y apellidos del resultado

    // Generar un código de verificación (simulación, debes generar tu propio código)
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // Genera un código de 6 dígitos

    // Aquí llamamos a la función para enviar el correo con el código
    await sendVerificationEmail(Correo, verificationCode.toString(), Nombres, Apellidos);

    // Respondemos con éxito si todo está bien
    return NextResponse.json({ results: true });
  } catch (error) {
    console.error(error);
    return new NextResponse("Algo salió mal en el servidor", { status: 501 });
  }
}
