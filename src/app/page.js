  "use client";

import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6"; 

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mostrar, setMostrar] = useState(false); //para alternar visibilidad de contraseña
  const [mensaje, setMensaje] = useState("");

  // Función para alternar la visibilidad de la contraseña
  const mostrarContraseña = () => {
    setMostrar(!mostrar); // Cambia el estado de "mostrar"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ correo, contraseña }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setMensaje(data.message || data.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-blue-400 to blue-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-8">
       <img
         src="/img/logo.png"
         alt="registro"
         className="w-10 h-10 mr-3"
      />
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
    </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <input
              type={mostrar ? "text" : "password"}
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
              {mostrar ? (
                <FaRegEye onClick={mostrarContraseña} /> 
              ) : (
                <FaRegEyeSlash
                  className="text-red-800"
                  onClick={mostrarContraseña} 
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿Olvidaste tu contraseña?
            <a href="/recuperacionContrase" className="text-blue-600 hover:text-blue-800">
              {" "}
              Recuperar contraseña
            </a>
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?
            <a href="/registro" className="text-blue-600 hover:text-blue-800">
              {" "}
              ¡Regístrate Aquí!
            </a>
          </p>
        </div>
        <p className="mt-4 text-center text-red-600">{mensaje}</p>
      </div>
    </div>
  );
}
