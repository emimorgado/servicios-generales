import bcrypt from "bcrypt"; // Asegúrate de importar bcrypt
import { client } from "@/lib/bd";
import { NextRequest, NextResponse } from "next/server";
import { transporter } from "@/config/mailer";


export async function POST(request) {
  const body = await request.json();
  const {
    Nombres,
    Apellidos,
    Correo,
    Fecha_nacimiento,
    Nacionalidad,
    Cedula,
    Direccion,
    Contraseña,
    Confirmar_contraseña,
    Url,
    Instagram,
    X,
    TikTok,
    Facebook,
    Descripcion,
  } = body;

  // Validar que los campos requeridos no sean undefined
  if (
    !Nombres ||
    !Apellidos ||
    !Correo ||
    !Fecha_nacimiento ||
    !Nacionalidad ||
    !Cedula ||
    !Direccion ||
    !Contraseña ||
    !Confirmar_contraseña
  
  ) {
    return NextResponse.json(
      { error: "Faltan campos requeridos" },
      { status: 400 }
    );
  }

  // Validar que las contraseñas coincidan
   if (Contraseña !== Confirmar_contraseña) {
    return NextResponse.json(
      { error: "Las contraseñas no coinciden" },
      { status: 400 }
     );
  }

  // Encriptar la contraseña usando bcrypt
  const saltRounds = 10; // Número de rondas de sal
  const hashedPassword = await bcrypt.hash(Contraseña, saltRounds);

  // Reemplazar undefined con null
  const values = [
    Nombres,
    Apellidos,
    Correo,
    Fecha_nacimiento,
    Nacionalidad,
    Cedula,
    Direccion,
    hashedPassword, // Solo almacenar la contraseña encriptada
    Url,
    Instagram,
    X,
    TikTok,
    Facebook,
    Descripcion,
  ];

  try {
    // Insertar la nueva persona en la base de datos
    const InsertPersona = await client.execute(
      `INSERT INTO personas (Nombres, Apellidos, Correo, Fecha_nacimiento, Nacionalidad, Cedula, Direccion, Contraseña, Url, Instagram, X, TikTok, Facebook, Descripcion ) 
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, // Sin ConfirmPassword
      values
    );

    // Validar si la inserción fue exitosa
    if (InsertPersona) {
      // Primero devolvemos la respuesta de éxito al cliente
      const response = NextResponse.json({ results: true });

      // Verificamos la conexión a internet
      let isConnected = false;

      try {
        const internetCheck = await fetch("https://www.google.com", {
          method: "HEAD",
        });
        isConnected = internetCheck.ok; // Verificamos si la respuesta existe y es ok
      } catch (error) {
        console.log("Error al verificar la conexión a internet:", error);
      }

      if (isConnected) {
        // Si hay conexión a internet, enviamos el correo electrónico de bienvenida
        await transporter.sendMail({
          to: Correo,
          subject: 'CONFIRMACIÓN DE REGISTRO',
          html: `
                   <html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden; 
        }
        .header {
            position: relative; /* Permite posicionamiento absoluto del logo */
            background-color: #818cf8;
            padding: 20px;
            color: #ffffff;
            text-align: center; /* Centra el texto horizontalmente */
        }
        .header img {
            position: absolute; /* Posiciona el logo */
            left: 20px; /* Separación del borde izquierdo */
            top: 50%; /* Centrado vertical relativo al contenedor */
            transform: translateY(-50%); /* Alineación perfecta del centro vertical */
            max-width: 40px; /* Tamaño máximo del logo */
        }
        .header h2 {
            margin: 0;
            font-size: 22px;
            font-weight: bold;
        }
        .content {
            padding: 30px 20px;
            text-align: center;
        }
        .content h1 {
            font-size: 24px;
            color: #333333;
            margin: 0 0 10px;
        }
        .content p {
            font-size: 16px;
            color: #666666;
            line-height: 1.6;
        }
        .cta-button {
            display: inline-block;
            margin: 20px 0;
            padding: 12px 25px;
            background-color: #818cf8;
            color: #ffffff;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .cta-button:hover {
            background-color: #6366f1;
        }
        .footer {
            background-color: #f0f0f0;
            text-align: center;
            padding: 15px 10px;
            font-size: 14px;
            color: #888888;
        }
        .footer p {
            margin: 0;
        }
        .footer a {
            color: #818cf8;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
     <div class="container">
        <!-- Header -->
        <div class="header">
            <img src="https://scontent.fccs9-1.fna.fbcdn.net/v/t39.30808-6/469005697_1817844599040513_8571523151537626623_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=cEpGRKF9gwEQ7kNvgHh1up0&_nc_zt=23&_nc_ht=scontent.fccs9-1.fna&_nc_gid=AV05iRxaKcHYBbg2zGvHcHL&oh=00_AYAA-IJ2Y72dBzzHLRWe9PgJEq7OuTaTN0qEpSyII6oY6g&oe=6754286C" alt="Logo ServiExpress">
            <h2>¡Bienvenido a ServiExpress!</h2>
        </div>

        <!-- Content -->
        <div class="content">
            <h1>Hola, ${Nombres} ${Apellidos}!</h1>
            <p>
                Gracias por unirte a nuestra plataforma de servicios a domicilio. 
                Estamos aquí para ayudarte con tus necesidades de manera rápida, eficiente y confiable.
            </p>
            <p>
                Explora todo lo que ServiExpress tiene para ofrecer. ¡Tu comodidad es nuestra prioridad!
            </p>
            <a href="https://www.serviexpress.com" class="cta-button">Explorar Servicios</a>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p>© 2024 ServiExpress. Todos los derechos reservados.</p>
            <p>
                <a href="https://www.serviexpress.com/politicas">Políticas de privacidad</a> | 
                <a href="https://www.serviexpress.com/contacto">Contáctanos</a>
            </p>
        </div>
    </div>
</body>
</html>

                    `,
        });
      } else {
        console.log("No hay conexión a internet. El correo no fue enviado.");
      }

      // Retornamos la respuesta después de intentar enviar el correo
      return response;
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Algo salió mal en el servidor" },
      { status: 500 }
    ); // Cambiar a status 500 para error interno
  }
}
