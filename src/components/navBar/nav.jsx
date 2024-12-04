"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = ({ About, home, Contactanos, login, perfil, verPag }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [boton, setboton] = useState(false);

  useEffect(() => {
    setboton(true);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-700 w-full z-20 top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="img/logo_formula1_nuevo1.png" className="h-8" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {boton && !login && (
             <Link href="login">
               <button type="button" className="text-white bg-red-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">
                 Sign in
               </button>
             </Link>
          )}

          
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        {isClient && (
          <div className={`items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
              {!home && (
                <li>
                  <Link href="../" className="block py-2 px-3 text-black rounded md:bg-transparent md:text-red-600 md:p-0" aria-current="page">Home</Link>
                </li>
              )}
              {!About && (
                <li>
                  <Link href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0">About</Link>
                </li>
              )}
              {!Contactanos && (
                <li>
                  <Link href="Contacs" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Contactanos</Link>
                </li>
              )}
               {!perfil && (
              <li>
                <Link href="../Perfil" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0">Mi perfil</Link>                
              </li>
              )}
               {/* {!verPag && (
              <li>
                <Link href="../info" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-600 md:p-0">VerPag</Link>                
              </li>
              )} */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
