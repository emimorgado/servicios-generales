import bcrypt from "bcrypt";  
import { client } from "@/lib/bd";  
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { correo, contraseña } = body;

  if (!correo || !contraseña) {
    return NextResponse.json(
      { error: "Correo o contraseña faltante" },
      { status: 400 }
    );
  }

  try {
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

    const isMatch = await bcrypt.compare(contraseña, user.Contraseña);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Inicio de sesión exitoso" },
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
