import { client } from "@/lib/bd";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  const {
    correo,
    direccion,
    telefono,
    instagram,
    facebook,
    tiktok,
    x,
    url,
    descripcion
  } = await request.json();

  // Validación de campos
  if (!correo) {
    return NextResponse.json(
      { error: "Correo es requerido" },
      { status: 400 }
    );
  }

  try {
    // Verificar que el usuario exista
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

    // Actualizar los datos del perfil
    await client.execute(
      `UPDATE personas SET 
        Direccion = ?, 
        Instagram = ?, 
        Facebook = ?, 
        Tiktok = ?, 
        X = ?, 
        Url = ?, 
        Descripcion = ?, 
        Cedula = ? 
      WHERE Correo = ?`,
      [
        direccion || user.Direccion,
        instagram || user.Instagram,
        facebook || user.Facebook,
        tiktok || user.Tiktok,
        x || user.X,
        url || user.Url,
        descripcion || user.Descripcion,
        telefono || user.Cedula,
        correo
      ]
    );

    return NextResponse.json(
      { message: "Perfil actualizado con éxito" },
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
