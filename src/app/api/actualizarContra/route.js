import { client } from "@/lib/bd";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Asegúrate de instalar bcrypt

export async function POST(request) {
  const body = await request.json();
  const { Correo, Contraseña } = body;

  try {
    // Encriptar la nueva contraseña con bcrypt
    const saltRounds = 10; // Número de rondas para generar la sal
    const hashedPassword = await bcrypt.hash(Contraseña, saltRounds);

    // Actualizar la contraseña en la base de datos
    const query = `
      UPDATE personas
      SET Contraseña = ?
      WHERE Correo = ?
    `;
    
    await client.query(query, [hashedPassword, Correo]);

    return NextResponse.json({ results: true });
  } catch (error) {
    console.error(error);
    return new NextResponse('Algo salió mal en el servidor', { status: 501 });
  }
}
