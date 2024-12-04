"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaRegEyeSlash, FaRegEye, FaLocationDot } from "react-icons/fa6";
import {
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaIdCard,
  FaRegUser,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { z } from "zod"; 

const Form = () => {
  const [step, setStep] = useState(1);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [contraseña, establecerContraseña] = useState(false);
  const [contraseña2, establecerContraseña2] = useState(false);

  const manejarCheckbox = (e) => {
    setShowUrlInput(e.target.checked);
  };

  // Función para validar la fecha de nacimiento
const validateFechaNacimiento = (fecha) => {
  const currentDate = new Date();
  const minDate = new Date('1900-01-01');
  const birthDate = new Date(fecha);

  // Verificar que la fecha esté dentro del rango permitido
  if (birthDate > currentDate || birthDate < minDate) {
    return false;
  }

  // Verificar que el usuario tenga al menos 18 años
  const ageDiffMs = currentDate - birthDate;
  const ageDate = new Date(ageDiffMs);
  const age = ageDate.getUTCFullYear() - 1970; // Utiliza el año 1970 como base

  return age >= 18;
};

const specialCharsRegex = /[*$#_]/;
// Define el esquema de validación con Zod
const step1Schema = z.object({
  Nombres: z.string().min(1, "El nombre es requerido"),
  Apellidos: z.string().min(1, "El apellido es requerido"),
  Correo: z.string().email("El correo no es válido"),
  Fecha_nacimiento: z.string().min(1, "").refine(validateFechaNacimiento, {
    message: "Fecha no valida, debes ser mayor de edad",
  }),
  Cedula: z.string().min(1, "Cédula es requerida,").regex(/^\d+$/, " debe contener solo números"),
  Direccion: z.string().min(1, "Direccion es obligatoria"),
  Contraseña: z.string().min(6, "Debe tener al menos 8 caracteres,").refine(value => specialCharsRegex.test(value), {
    message: " y contener al menos uno de los caracteres: /, $, *, _",
  }),
  Confirmar_contraseña: z.string().min(6, "Debe tener 8 caracteres"),
}).refine(data => data.Contraseña === data.Confirmar_contraseña, {
  message: "Las contraseñas no coinciden",
  path: ["ConfirmPasswoConfirmar_contraseñard"],
});

const step2Schema = z.object({
  Url: z.string().optional().refine(url => !url || url.startsWith("https://"), {
    message: "La URL debe comenzar con 'https://'",
  }),
  Instagram: z.string().optional(),
  X: z.string().optional(),
  TikTok: z.string().optional(),
  Facebook: z.string().optional(),
  Descripcion: z.string().optional(),
});

  // Estados para cada paso del formulario
  const [step1Data, setStep1Data] = useState({
    Nombres: "",
    Apellidos: "",
    Correo: "",
    Fecha_nacimiento: "",
    Nacionalidad: "",
    Cedula: "",
    Direccion: "",
    Contraseña: "",
    Confirmar_contraseña: "",
  });

  const [step2Data, setStep2Data] = useState({
    Url: "",
    Instagram: "",
    X: "",
    TikTok: "",
    Facebook: "",
    Descripcion: "",
  });

  const [errors, setErrors] = useState({}); // Estado para los errores de validación

  // Función genérica para manejar cambios
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (step === 1) {
      setStep1Data((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (step === 2) {
      setStep2Data((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleNext = () => {
    try {
      step1Schema.parse(step1Data); // Valida los datos del paso 1
      setErrors({}); // Limpia los errores si la validación es exitosa
      setStep(step + 1);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.formErrors.fieldErrors);
      }
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  

  const mostrarContraseña = () => {
    establecerContraseña(!contraseña);
  };

  const mostrarContraseña2 = () => {
    establecerContraseña2(!contraseña2);
  };

  const handleSubmit = async () => {
    // Aquí puedes añadir validaciones para el paso 2 si lo necesitas
    try {
      // Combina los datos de ambos pasos
      const formData = {
        ...step1Data,
        ...step2Data,
        Descripcion: `<p>${step2Data.Descripcion}</p>`,
      };

      const res = await fetch("api/registro", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Registro exitoso");
        setStep(2);
        window.location.reload();
      } else {
        alert("Error al enviar datos");
      }
    } catch (error) {
      alert("Error al enviar datos: " + error.message);
    }
  };

  return (
    <div className="relative ">
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-300 via-blue-400 to blue-500">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
       <div className="flex items-center justify-center mb-8">
        <img
          src="/img/logo.png"
          alt="registro"
          className="w-10 h-10 mr-3"
        />
        <h1 className="text-2xl text-black">Registro ServisExpress</h1>
      </div>
          <form className="space-y-6">
            {step === 1 && (
              <>
                {/* Campos del paso 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="Nombres"
                      id="Nombres"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      placeholder=" "
                      required
                      value={step1Data.Nombres}
                      onChange={handleChange}
                    />
                    {errors.Nombres && <p className="text-red-500 text-sm">{errors.Nombres}</p>}
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Nombre
                    </label>
                  </div>
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="Apellidos"
                      id="Apellidos"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      placeholder=" "
                      required
                      value={step1Data.Apellidos}
                      onChange={handleChange}
                    />
                    {errors.Apellidos && <p className="text-red-500 text-sm">{errors.Apellidos}</p>}
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Apellido
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative z-0 w-full group mt-4">
                    <input
                      type="email"
                      name="Correo"
                      id="Correo"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      placeholder=" "
                      required
                      value={step1Data.Correo}
                      onChange={handleChange}
                    />
                    {errors.Correo && <p className="text-red-500 text-sm">{errors.Correo}</p>}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                      <MdOutlineMarkEmailRead />
                    </div>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Correo Electrónico
                    </label>
                  </div>

                  {/* Campo de Fecha de Nacimiento */}
                  <div className="relative z-0 w-full group mt-4">
                    <input
                      type="date"
                      name="Fecha_nacimiento"
                      id="Fecha_nacimiento"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      required
                      value={step1Data.Fecha_nacimiento}
                      onChange={handleChange}
                    />
                    {errors.Fecha_nacimiento && <p className="text-red-500 text-sm">{errors.Fecha_nacimiento}</p>}
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Fecha de Nacimiento
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative z-0 w-full group mt-5">
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Nacionalidad
                    </label>
                    <div className="flex items-center space-x-2">
                      <select
                        id="Nacionalidad"
                        name="Nacionalidad"
                        className=" py-2  w-full text-sm text-zinc-600 border-b-2  bg-transparent border-gray-300   focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                        value={step1Data.Nacionalidad}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        <option value="v">Venezolano</option>
                        <option value="e">Extranjero</option>
                      </select>
                      {errors.Nacionalidad && <p className="text-red-500 text-sm">{errors.Nacionalidad}</p>}
                    </div>
                  </div>
                  <div className="relative z-0 w-full group mt-4">
                    <input
                      type="text"
                      id="Cedula"
                      name="Cedula"
                      placeholder=""
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      required
                      value={step1Data.Cedula}
                      onChange={handleChange}
                    />
                    {errors.Cedula && <p className="text-red-500 text-sm">{errors.Cedula}</p>}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                      <FaIdCard />
                    </div>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Cedula
                    </label>
                  </div>
                </div>

                {/* Nueva sección para la dirección */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="Direccion"
                    id="Direccion"
                    className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                    placeholder=" "
                    required
                    value={step1Data.Direccion}
                    onChange={handleChange}
                  />
                  {errors.Direccion && <p className="text-red-500 text-sm">{errors.Direccion}</p>}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                    <FaLocationDot />
                  </div>
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Dirección
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative z-0 w-full group">
                    <input
                      type={contraseña ? "text" : "password"}
                      name="Contraseña"
                      id="Contraseña"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      placeholder=" "
                      required
                      value={step1Data.Contraseña}
                      onChange={handleChange}
                    />
                    {errors.Contraseña && <p className="text-red-500 text-sm">{errors.Contraseña}</p>}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                      {contraseña ? (
                        <FaRegEye onClick={mostrarContraseña} />
                      ) : (
                        <FaRegEyeSlash
                          className="text-red-800"
                          onClick={mostrarContraseña}
                        />
                      )}
                    </div>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Contraseña
                    </label>
                  </div>
                  <div className="relative z-0 w-full group">
                    <input
                      type={contraseña2 ? "text" : "password"}
                      name="Confirmar_contraseña"
                      id="Confirmar_contraseña"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      placeholder=" "
                      required
                      value={step1Data.Confirmar_contraseña}
                      onChange={handleChange}
                    />
                    {errors.Confirmar_contraseña && <p className="text-red-500 text-sm">{errors.Confirmar_contraseña}</p>}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
                      {contraseña2 ? (
                        <FaRegEye onClick={mostrarContraseña2} />
                      ) : (
                        <FaRegEyeSlash
                          className="text-red-800 "
                          onClick={mostrarContraseña2}
                        />
                      )}
                    </div>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Confirmar contraseña
                    </label>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <div className="flex justify-center mt-4">
                    <h6 className="text-gray-400">¿Ya tienes cuenta? </h6>
                    <button className="text-gray-600 ml-2 mr-2 focus:ring-4 font-medium text-sm   hover:scale-105">
                      <Link href="../">Ir al login</Link>
                    </button>
                  </div>
                  <button
                    className="bg-indigo-400 rounded-lg py-2 px-4 text-white font-semibold hover:bg-indigo-500 transition duration-300 "
                    type="button"
                    onClick={handleNext}
                  >
                    Siguiente
                  </button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Campos del paso 2 */}
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="showUrlInput"
                    name="showUrlInput"
                    className="w-5 h-5 text-indigo-400 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    checked={showUrlInput}
                    onChange={manejarCheckbox}
                  />
                  <label
                    htmlFor="showUrlInput"
                    className="ml-2 text-sm font-medium text-gray-700"
                  >
                    ¿Deseas agregar la URL de tu sitio web?
                  </label>
                </div>

                {/* Input de URL (visible solo si el checkbox está seleccionado) */}
                {showUrlInput && (
                  <div className="relative">
                    <input
                      type="text"
                      name="Url"
                      id="Url"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      placeholder=" "
                      required
                      value={step2Data.Url}
                      onChange={handleChange}
                    />
                    {errors.Url && <p className="text-red-500 text-sm">{errors.Url}</p>}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                      <TbWorldWww />
                    </div>
                    <label
                      htmlFor="Url"
                      className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      URL
                    </label>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="Instagram"
                      id="Instagram"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      placeholder=" "
                      required
                      value={step2Data.Instagram}
                      onChange={handleChange}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                      <FaInstagram />
                    </div>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Instagram
                    </label>
                  </div>
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="X"
                      id="X"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      placeholder=" "
                      required
                      value={step2Data.X}
                      onChange={handleChange}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                      <BsTwitterX />
                    </div>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Twitter
                    </label>
                  </div>
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="TikTok"
                      id="TikTok"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      placeholder=" "
                      required
                      value={step2Data.TikTok}
                      onChange={handleChange}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                      <FaTiktok />
                    </div>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      TikTok
                    </label>
                  </div>
                  <div className="relative z-0 w-full group">
                    <input
                      type="text"
                      name="Facebook"
                      id="Facebook"
                      className="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-500 peer mt-1"
                      placeholder=" "
                      required
                      value={step2Data.Facebook}
                      onChange={handleChange}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
                      <FaFacebook />
                    </div>
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                      Facebook
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                    Descripcion personal
                  </label>
                  <textarea
                    id="Descripcion"
                    name="Descripcion"
                    rows="4"
                    className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Escribe tu descripción aquí"
                    value={step2Data.Descripcion}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    className="bg-indigo-400 rounded-lg py-2 px-4 text-white font-semibold hover:bg-indigo-500 transition duration-300"
                    type="button"
                    onClick={handleBack}
                  >
                    Atrás
                  </button>

                  <button
                    className="bg-indigo-400 rounded-lg py-2 px-4 text-white font-semibold hover:bg-indigo-500 transition duration-300"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Enviar
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
