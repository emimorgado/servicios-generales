import { useState, useEffect } from "react";

export default function Alert({ message, type = "success", duration = 3000 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer); // Limpia el timeout si el componente se desmonta
  }, [duration]);

  if (!show) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white text-sm font-medium 
        ${
          type === "success"
            ? "bg-green-500"
            : type === "error"
            ? "bg-red-500"
            : "bg-blue-500"
        }`}
    >
      {message}
    </div>
  );
}
