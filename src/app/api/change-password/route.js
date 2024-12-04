import bcrypt from "bcrypt";
import { client } from "@/lib/bd";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const { correo, currentPassword, newPassword } = await request.json();

  // Validación de campos
  if (!correo || !currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Faltan campos requeridos" },
      { status: 400 }
    );
  }

  try {
    // Buscar usuario por correo
    const [user] = await client.execute(
      `SELECT * FROM personas WHERE Correo = ?`,
      [correo]
    );

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    // Verificar que la contraseña actual sea correcta
    const isMatch = await bcrypt.compare(currentPassword, user.Contraseña);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    // Encriptar nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar contraseña en la base de datos
    await client.execute(
      `UPDATE personas SET Contraseña = ? WHERE Correo = ?`,
      [hashedPassword, correo]
    );

    return NextResponse.json(
      { message: "Contraseña actualizada con éxito" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
