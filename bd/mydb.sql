-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2024 a las 17:59:04
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mydb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `passwordrecovery`
--

CREATE TABLE `passwordrecovery` (
  `ID` int(11) NOT NULL,
  `Correo` varchar(255) NOT NULL,
  `Code` varchar(10) NOT NULL,
  `CreatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `id_Personas` int(11) NOT NULL,
  `Nombres` varchar(45) NOT NULL,
  `Apellidos` varchar(45) NOT NULL,
  `Fecha_nacimiento` date NOT NULL,
  `Correo` varchar(45) NOT NULL,
  `Cedula` varchar(45) NOT NULL,
  `Direccion` varchar(500) NOT NULL,
  `Nacionalidad` varchar(200) NOT NULL,
  `Instagram` varchar(45) DEFAULT NULL,
  `Facebook` varchar(45) DEFAULT NULL,
  `Tiktok` varchar(45) DEFAULT NULL,
  `X` varchar(45) DEFAULT NULL,
  `Contraseña` varchar(500) NOT NULL,
  `Url` varchar(100) DEFAULT NULL,
  `Descripcion` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas-de-seguridad`
--

CREATE TABLE `preguntas-de-seguridad` (
  `idPreguntas-de-seguridad` int(11) NOT NULL,
  `Pregunta` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios-preguntas-de-seguridad`
--

CREATE TABLE `usuarios-preguntas-de-seguridad` (
  `id-Usuarios-Preguntas-de-seguridadcol` int(11) NOT NULL,
  `Usuarios_id-Usuarios` int(11) NOT NULL,
  `Preguntas-de-seguridad_idPreguntas-de-seguridad` int(11) NOT NULL,
  `Respuestas` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `passwordrecovery`
--
ALTER TABLE `passwordrecovery`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`id_Personas`),
  ADD UNIQUE KEY `id_Personas_UNIQUE` (`id_Personas`);

--
-- Indices de la tabla `preguntas-de-seguridad`
--
ALTER TABLE `preguntas-de-seguridad`
  ADD PRIMARY KEY (`idPreguntas-de-seguridad`);

--
-- Indices de la tabla `usuarios-preguntas-de-seguridad`
--
ALTER TABLE `usuarios-preguntas-de-seguridad`
  ADD PRIMARY KEY (`id-Usuarios-Preguntas-de-seguridadcol`),
  ADD KEY `fk_Usuarios_has_Preguntas-de-seguridad_Preguntas-de-segurid_idx` (`Preguntas-de-seguridad_idPreguntas-de-seguridad`),
  ADD KEY `fk_Usuarios_has_Preguntas-de-seguridad_Usuarios1_idx` (`Usuarios_id-Usuarios`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `passwordrecovery`
--
ALTER TABLE `passwordrecovery`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `personas`
--
ALTER TABLE `personas`
  MODIFY `id_Personas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
