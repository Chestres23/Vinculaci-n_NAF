import React from "react";

const Boletines = () => {
  return (
    <div className="h-screen grid grid-rows-[auto_1fr_auto]">
      {/* Header fijo */}
      <header className="bg-blue-800 text-white h-16 flex items-center justify-center shadow-md">
        <h1 className="text-xl font-bold">UVision</h1>
      </header>

      {/* Contenido principal con scroll */}
      <main className="overflow-y-auto p-4 bg-white">
        {/* Aquí va todo tu contenido principal */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">¿Quiénes Somos?</h2>
          <p>
            Somos un grupo de estudiantes comprometidos con la inclusión...
          </p>
          {/* Puedes seguir agregando más contenido aquí */}
        </section>
      </main>

      {/* Footer fijo */}
      <footer className="bg-gray-800 text-white h-16 flex items-center justify-center shadow-inner">
        <p className="text-sm">© 2025 UVision - Todos los derechos reservados</p>
      </footer>
    </div>
  );
};

export default Boletines;