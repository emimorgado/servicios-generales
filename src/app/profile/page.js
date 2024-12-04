"use client";

import { useState, useEffect } from "react";

export default function Profile() {
  const [userData, setUserData] = useState({
    Nombres: "",
    Apellidos: "",
    Fecha_nacimiento: "",
    Cedula: "",
    Direccion: "",
    Nacionalidad: "",
    Instagram: "",
    Facebook: "",
    Tiktok: "",
    X: "",
    Url: "",
    Descripcion: "",
    Telefono: "",
    Correo: "",
  });
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) throw new Error("Error al obtener datos");
        const data = await res.json();
        setUserData(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleEdit = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const saveProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error("Error al actualizar el perfil");
      alert("Perfil actualizado correctamente");
      setShowEditModal(false);
    } catch (error) {
      console.error(error.message);
      alert("Hubo un error al actualizar el perfil");
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const res = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordData),
      });
      if (!res.ok) throw new Error("Error al cambiar la contraseña");
      alert("Contraseña cambiada correctamente");
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error(error.message);
      alert("Hubo un error al cambiar la contraseña");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white mt-6 p-6 rounded-lg shadow-md w-11/12 sm:w-8/12 md:w-6/12 lg:w-4/12">
        <div className="flex flex-col items-center">
          <h2 className="mt-4 text-2xl font-semibold">
            {userData.Nombres} {userData.Apellidos}
          </h2>
          <p className="text-gray-500">{userData.Nacionalidad}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-700">Información Personal</h3>
          <ul className="mt-4 text-gray-600">
            <li className="flex justify-between py-2 border-b">
              <span className="font-medium">Correo:</span>
              <span>{userData.Correo}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <span className="font-medium">Cédula:</span>
              <span>{userData.Cedula}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <span className="font-medium">Teléfono:</span>
              <span>{userData.Telefono}</span>
            </li>
            <li className="flex justify-between py-2 border-b">
              <span className="font-medium">Dirección:</span>
              <span>{userData.Direccion}</span>
            </li>
            <li className="flex justify-between py-2">
              <span className="font-medium">Redes Sociales:</span>
              <div className="space-x-2">
                {userData.Instagram && (
                  <a
                    href={`https://instagram.com/${userData.Instagram}`}
                    target="_blank"
                    className="text-blue-600"
                  >
                    Instagram
                  </a>
                )}
                {userData.Facebook && (
                  <a
                    href={`https://facebook.com/${userData.Facebook}`}
                    target="_blank"
                    className="text-blue-600"
                  >
                    Facebook
                  </a>
                )}
                {userData.Tiktok && (
                  <a
                    href={`https://tiktok.com/@${userData.Tiktok}`}
                    target="_blank"
                    className="text-blue-600"
                  >
                    TikTok
                  </a>
                )}
                {userData.X && (
                  <a
                    href={`https://twitter.com/${userData.X}`}
                    target="_blank"
                    className="text-blue-600"
                  >
                    X
                  </a>
                )}
                {userData.Url && (
                  <a
                    href={userData.Url}
                    target="_blank"
                    className="text-blue-600"
                  >
                    URL del Perfil
                  </a>
                )}
              </div>
            </li>
            <li className="flex justify-between py-2 border-b">
              <span className="font-medium">Descripción:</span>
              <span>{userData.Descripcion}</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={() => setShowEditModal(true)}
          >
            Editar Perfil
          </button>
          <button
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
            onClick={() => setShowPasswordModal(true)}
          >
            Cambiar Contraseña
          </button>
        </div>
      </div>

      {/* Modal para edición */}
      {showEditModal && (
        <Modal title="Editar Perfil" onClose={() => setShowEditModal(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveProfile();
            }}
            className="space-y-4"
          >
            {/* Nombres */}
            <div>
              <label htmlFor="Nombres" className="block text-sm font-medium text-gray-700">
                Nombres
              </label>
              <input
                type="text"
                id="Nombres"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.Nombres}
                onChange={(e) => handleEdit("Nombres", e.target.value)}
              />
            </div>
            {/* Apellidos */}
            <div>
              <label htmlFor="Apellidos" className="block text-sm font-medium text-gray-700">
                Apellidos
              </label>
              <input
                type="text"
                id="Apellidos"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.Apellidos}
                onChange={(e) => handleEdit("Apellidos", e.target.value)}
              />
            </div>
            {/* Teléfono */}
            <div>
              <label htmlFor="Telefono" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                type="text"
                id="Telefono"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.Telefono}
                onChange={(e) => handleEdit("Telefono", e.target.value)}
              />
            </div>
            {/* Dirección */}
            <div>
              <label htmlFor="Direccion" className="block text-sm font-medium text-gray-700">
                Dirección
              </label>
              <input
                type="text"
                id="Direccion"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.Direccion}
                onChange={(e) => handleEdit("Direccion", e.target.value)}
              />
            </div>
            {/* Redes Sociales */}
            <div>
              <label htmlFor="Instagram" className="block text-sm font-medium text-gray-700">
                Instagram
              </label>
              <input
                type="text"
                id="Instagram"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.Instagram}
                onChange={(e) => handleEdit("Instagram", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Facebook" className="block text-sm font-medium text-gray-700">
                Facebook
              </label>
              <input
                type="text"
                id="Facebook"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.Facebook}
                onChange={(e) => handleEdit("Facebook", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Tiktok" className="block text-sm font-medium text-gray-700">
                TikTok
              </label>
              <input
                type="text"
                id="Tiktok"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.Tiktok}
                onChange={(e) => handleEdit("Tiktok", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="Url" className="block text-sm font-medium text-gray-700">
                URL del Perfil
              </label>
              <input
                type="text"
                id="Url"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.Url}
                onChange={(e) => handleEdit("Url", e.target.value)}
              />
            </div>
            {/* Descripción */}
            <div>
              <label htmlFor="Descripcion" className="block text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                id="Descripcion"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userData.Descripcion}
                onChange={(e) => handleEdit("Descripcion", e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Guardar
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal para cambiar contraseña */}
      {showPasswordModal && (
        <Modal title="Cambiar Contraseña" onClose={() => setShowPasswordModal(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordChange();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Contraseña Actual
              </label>
              <input
                type="password"
                id="currentPassword"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                Nueva Contraseña
              </label>
              <input
                type="password"
                id="newPassword"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Nueva Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={() => setShowPasswordModal(false)}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Cambiar Contraseña
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

const Modal = ({ children, title, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-11/12 sm:w-8/12 md:w-6/12 p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
      <button
        className="absolute top-2 right-2 text-gray-500"
        onClick={onClose}
      >
        X
      </button>
    </div>
  </div>
);
