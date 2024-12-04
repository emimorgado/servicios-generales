import { client } from "@/lib/bd";
import { NextRequest, NextResponse } from "next/server";


/**
 * @param {NextRequest} request
 */
export async function POST(request) {
  const body = await request.json();
  const { verificationCode } = body;

  try {
    // Verificar si el correo electrónico existe en la base de datos
    const query = `
    SELECT * FROM PasswordRecovery
    WHERE Code = ? AND CreatedAt >= DATE_SUB(NOW(), INTERVAL 5 MINUTE)
  `;
    const [rows] = await client.query(query, [verificationCode]);

    if (rows.length === 0) {
      // Si el correo electrónico no existe en la base de datos, enviamos una respuesta de error
      return NextResponse.json({ error: 'el codigo no es valido' }, { status: 404 });
    }
    
    
    // Respondemos con éxito si todo está bien
    return NextResponse.json({ results: true });
  } catch (error) {
    console.error(error);
    return new NextResponse('Algo salió mal en el servidor', { status: 501 });
  }
}
