import React from 'react';
import { motion } from 'framer-motion';
import fondo6 from "../../assets/fondo6.jpg";

function Servicios() {
  return (
    <main
      className="py-16 px-6 min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${fondo6})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Contenido principal con animación */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-4xl mx-auto py-16 px-8"
      >
        <div className="bg-white bg-opacity-95 shadow-2xl rounded-3xl p-10 space-y-8">
          <h2 className="text-4xl font-extrabold text-center text-green-900 mb-8">Asesoría Virtual</h2>
          <p className="text-center text-gray-600">
            Por favor, completa el siguiente formulario para que uno de nuestros asesores te brinde la ayuda que necesitas.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Nombres y Apellidos</label>
                <input type="text" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Cédula o RUC</label>
                <input type="text" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Correo Electrónico</label>
                <input type="email" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Teléfono de contacto</label>
                <input type="tel" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Ciudad</label>
                <input type="text" className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Tipo de Servicio Requerido</label>
                <select className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Seleccione...</option>
                  <option value="declaraciones">Declaraciones tributarias</option>
                  <option value="ruc">Actualización de RUC</option>
                  <option value="gastos">Deducción de gastos personales</option>
                  <option value="facturacion">Facturación electrónica</option>
                  <option value="otros">Otros</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-1">Tipo de Contribuyente</label>
                <select className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Seleccione...</option>
                  <option value="natural_no_conta">Persona natural no obligada a llevar contabilidad</option>
                  <option value="natural_conta">Persona natural obligada a llevar contabilidad</option>
                  <option value="juridica">Persona jurídica</option>
                  <option value="sociedad">Sociedad</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Detalle de su solicitud</label>
              <textarea
                rows="5"
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Explique brevemente en qué necesita asesoría"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-green-800 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </main>
  );
}

export default Servicios;
