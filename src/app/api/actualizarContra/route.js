import { client } from "@/lib/bd";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { Correo, Contraseña } = body;
  

  try {
    // Encriptar la nueva contraseña

    // Actualizar la contraseña en la base de datos
    const query = `
      UPDATE personas
      SET Contraseña = ?
      WHERE Correo = ?
    `;
    
    await client.query(query, [Contraseña, Correo]);

    return NextResponse.json({ results: true });
  } catch (error) {
    console.error(error);
    return new NextResponse('Algo salió mal en el servidor', { status: 501 });
  }
}
