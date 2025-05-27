import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      {/* Header fijo */}
      <header className="bg-blue-800 text-white h-16 flex items-center justify-center shadow-md z-10">
        <h1 className="text-xl font-bold">UVision</h1>
      </header>

      {/* Main con scroll */}
      <main className="overflow-y-auto bg-gradient-to-br from-gray-100 to-blue-50 p-4">
        {children}
      </main>

      {/* Footer fijo */}
      <footer className="bg-gray-800 text-white h-16 flex items-center justify-center shadow-inner z-10">
        <p className="text-sm">© 2025 UVision - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Layout;
