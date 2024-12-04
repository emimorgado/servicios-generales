"use client";
import React, { useState } from "react";
import {
  RiMailLine,
  RiLockLine,
  RiEyeLine,
  RiEyeOffLine,
} from "react-icons/ri";
import Link from "next/link";

export default function Contraseña() {
  const [Correo, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationError, setVerificationError] = useState("");
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [Contraseña, setPassword] = useState("");
  const [Confirmar_contraseña, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/envioCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Correo }),
      });
      const result = await response.json();
      if (response.ok) {
        setIsEmailSent(true);
        setVerificationError("");
        alert("Correo enviado exitosamente", "success");
      } else {
        setVerificationError("");
        alert(result.error || "Error al enviar correo", "error");
      }
    } catch (error) {
      setVerificationError("Error en la solicitud");
      alert("Error en la solicitud", "error");
    }
  };

  const handleSubmitVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/verificarCorreo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationCode }),
      });
      if (response.ok) {
        setIsCodeVerified(true);
        setVerificationError("");
        alert("Código de verificación correcto", "success");
      } else {
        setVerificationError("");
        alert("Código de verificación incorrecto o caducado", "error");
      }
    } catch (error) {
      setVerificationError(`Error en la solicitud: ${error.message}`);
      alert("Error en la solicitud", "error");
    }
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();

    if (Contraseña !== Confirmar_contraseña) {
      setVerificationError("Las contraseñas no coinciden");
      alert("Las contraseñas no coinciden", "error");
      return;
    }

    try {
      // Validar la contraseña con Zod
      

      const response = await fetch("/api/actualizarContra", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Correo, Contraseña }),
      });

      if (response.ok) {
        setVerificationError("");
        setIsPasswordChanged(true);
        alert("Contraseña cambiada exitosamente", "success");
      } else {
        const errorData = await response.json();
        setVerificationError(
          errorData.error || "Error al cambiar la contraseña"
        );
        alert(errorData.error || "Error al cambiar la contraseña", "error");
      }
    } catch (error) {
      if (error.errors) {
        setVerificationError(error.errors[0].message);
        alert(error.errors[0].message, "error");
      } else {
        setVerificationError(`Error en la solicitud: ${error.message}`);
        alert("Error en la solicitud", "error");
      }
    }
  };

  const handleResendEmail = () => {
    setIsEmailSent(false);
    setVerificationCode("");
    setVerificationError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-blue-400 to blue-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        {!isEmailSent ? (
          <>
            <div className="flex items-center justify-center mb-4">
              <h2 className="text-black text-center text-2xl font-bold mb-2">
                Recuperación de Contraseña
              </h2>
            </div>
            <form onSubmit={handleSubmitEmail} className="max-w-sm mx-auto">
              <div className="mb-4">
                <div className="relative z-0 w-full group">
                  <input
                    type="email"
                    id="Correo"
                    className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                    placeholder=""
                    value={Correo}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="Correo"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Correo Electrónico
                  </label>
                </div>
              </div>
              {verificationError && (
                <p className="text-red-500">{verificationError}</p>
              )}
              <button
                type="submit"
                className="bg-indigo-400 rounded-lg py-2 px-4 text-white font-semibold hover:bg-indigo-500 transition duration-300"
              >
                Enviar Correo
              </button>
            </form>
          </>
        ) : !isCodeVerified ? (
          <>
            <div className="flex items-center justify-center mb-4">
              <img
                src="/img/logo_daaltex.png"
                alt="Inicio de sesión"
                className="w-8 h-8 mr-2 mb-2"
              />
              <h2 className="text-black text-center text-2xl font-bold mb-2">
                Verificación de Código
              </h2>
            </div>
            <form
              onSubmit={handleSubmitVerification}
              className="max-w-sm mx-auto"
            >
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="verificationCode"
                  className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                  placeholder=""
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
                <label
                  htmlFor="verificationCode"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Introduzca su código Verificación
                </label>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="bg-indigo-400 rounded-lg py-2 px-4 text-white font-semibold hover:bg-indigo-500 transition duration-300"
                  onClick={handleResendEmail}
                >
                  Reenviar Correo
                </button>
                <button
                  type="submit"
                  className="bg-indigo-400 rounded-lg py-2 px-4 text-white font-semibold hover:bg-indigo-500 transition duration-300"
                >
                  Verificar
                </button>
              </div>
            </form>
          </>
        ) : !isPasswordChanged ? (
          <form
            onSubmit={handleSubmitPasswordChange}
            className="max-w-sm mx-auto"
          >
            <div className="flex items-center justify-center mb-4">
              <img
                src="/img/logo_daaltex.png"
                alt="Inicio de sesión"
                className="w-8 h-8 mr-2 mb-2"
              />
              <h1 className="text-black text-center text-2xl font-bold mb-2">
                CAMBIAR CONTRASEÑA
              </h1>
            </div>
            <div className="relative z-0 w-full group">
              <input
                type={showPassword ? "text" : "password"}
                id="Contraseña"
                className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                placeholder=""
                value={Contraseña}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="Contraseña"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nueva Contraseña
              </label>
              {showPassword ? (
                <RiEyeOffLine
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
                />
              ) : (
                <RiEyeLine
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
                />
              )}
            </div>

            <div className="mb-8">
              <div className="relative z-0 w-full group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="Confirmar_contraseña"
                  className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                  placeholder=""
                  value={Confirmar_contraseña}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <label
                  htmlFor="Confirmar_contraseña"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirmar Contraseña
                </label>
                {showConfirmPassword ? (
                  <RiEyeOffLine
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
                  />
                ) : (
                  <RiEyeLine
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
                  />
                )}
              </div>
            </div>
            {verificationError && (
              <p className="text-red-500">{verificationError}</p>
            )}
            <button
              type="submit"
              className="bg-indigo-400 rounded-lg py-2 px-4 text-white font-semibold hover:bg-indigo-500 transition duration-300"
            >
              Cambiar Contraseña
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-center text-2xl font-bold mb-4">
              Cambio exitosamente
            </h2>
            <p className="text-center text-sm text-black dark:text-black mb-4">
              ¡Hemos actualizado su contraseña correctamente!
            </p>
            <Link
              href="../login"
              className="text-center block text-sm text-blue-500 hover:underline"
            >
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
