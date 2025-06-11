import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import fondo6 from '../../assets/images/fondo6.jpg';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

function Servicios() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nombre: '',
    CedulaRUC: '',
    Correo: '',
    Telefono: '',
    Ciudad: '',
    TipoServicio: '',
    TipoContribuyente: '',
    Discapacidad: '',
    MedioContacto: '',
    DetalleSolicitud: ''
  });

  const [otroContribuyente, setOtroContribuyente] = useState('');
  const [otroMedio, setOtroMedio] = useState('');

  useEffect(() => {
  const obtenerDatosUsuario = async () => {
    if (!user) {
      Swal.fire({
        title: '¿Deseas una atención más personalizada?',
        text: 'Regístrate para guardar tu historial, recibir atención prioritaria y acceder a boletines quincenales.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Registrarme',
        cancelButtonText: 'Continuar sin registro'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/register';
        }
      });
    } else {
      try {
        const res = await fetch(`http://localhost:3001/api/users/${user.uid}`);
        const data = await res.json();

        setFormData(prev => ({
          ...prev,
          Nombre: `${data.Nombre || ''} ${data.SegundoNombre || ''} ${data.Apellido || ''} ${data.SegundoApellido || ''}`,
          CedulaRUC: data.CedulaRUC || '',
          Correo: data.Correo || '',
          Telefono: data.Telefono || '',
          Ciudad: data.Ciudad || '',
          TipoContribuyente: data.TipoContribuyente || '',
        }));
      } catch (error) {
        console.error("❌ Error al obtener datos del usuario:", error);
      }
    }
  };

  obtenerDatosUsuario();
}, [user]);



  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const datos = {
      ...formData,
      TipoContribuyente:
        formData.TipoContribuyente === 'otro' ? otroContribuyente : formData.TipoContribuyente,
      MedioContacto:
        formData.MedioContacto === 'otro' ? otroMedio : formData.MedioContacto,
      UsuarioId: userData?.Id || null
    };

    try {
      const res = await fetch('http://localhost:3001/api/asesorias/nueva', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      if (!res.ok) throw new Error('Error al registrar asesoría');

      Swal.fire('✅ Enviado', 'Tu solicitud fue registrada correctamente.', 'success');
      e.target.reset();
      setOtroContribuyente('');
      setOtroMedio('');
      setFormData(prev => ({
        ...prev,
        TipoServicio: '',
        TipoContribuyente: '',
        Discapacidad: '',
        MedioContacto: '',
        DetalleSolicitud: ''
      }));
    } catch (err) {
      Swal.fire('❌ Error', err.message, 'error');
    }
  };

  return (
    <main
      className="py-4 px-6 flex items-center justify-center"
      style={{
        backgroundImage: `url(${fondo6})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white bg-opacity-95 shadow-2xl rounded-3xl p-10 space-y-8 max-w-5xl">
          <h2 className="text-4xl font-extrabold text-center text-green-900 mb-4">
            Asesoría Virtual
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Completa el siguiente formulario para recibir asesoría.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                ['Nombre', 'Nombres y Apellidos'],
                ['CedulaRUC', 'Cédula o RUC'],
                ['Correo', 'Correo Electrónico'],
                ['Telefono', 'Teléfono'],
                ['Ciudad', 'Ciudad']
              ].map(([name, label]) => (
                <div key={name}>
                  <label className="block font-semibold text-gray-700 mb-1">{label}</label>
                  <input
                    name={name}
                    type="text"
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-xl"
                  />
                </div>
              ))}

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Tipo de Servicio</label>
                <select
                  name="TipoServicio"
                  value={formData.TipoServicio}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-xl"
                >
                  <option value="">Seleccione</option>
                  <option value="declaraciones">Declaraciones tributarias</option>
                  <option value="ruc">Actualización de RUC</option>
                  <option value="gastos">Gastos personales</option>
                  <option value="facturacion">Facturación electrónica</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Tipo de Contribuyente</label>
                <select
                  name="TipoContribuyente"
                  value={formData.TipoContribuyente}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-xl"
                >
                  <option value="">Seleccione</option>
                  <option value="natural_no_conta">Natural no contable</option>
                  <option value="natural_conta">Natural contable</option>
                  <option value="juridica">Jurídica</option>
                  <option value="sociedad">Sociedad</option>
                  <option value="otro">Otro</option>
                </select>
                {formData.TipoContribuyente === 'otro' && (
                  <input
                    type="text"
                    placeholder="Especifique"
                    value={otroContribuyente}
                    onChange={(e) => setOtroContribuyente(e.target.value)}
                    className="mt-2 w-full p-3 border rounded-xl"
                    required
                  />
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  ¿Tiene discapacidad?
                </label>
                <div className="flex gap-6">
                  <label>
                    <input
                      type="radio"
                      name="Discapacidad"
                      value="si"
                      onChange={handleChange}
                      required
                    />
                    <span className="ml-2">Sí</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="Discapacidad"
                      value="no"
                      onChange={handleChange}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Medio de contacto
                </label>
                <select
                  name="MedioContacto"
                  value={formData.MedioContacto}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border rounded-xl"
                >
                  <option value="">Seleccione</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="llamada">Llamada</option>
                  <option value="correo">Correo</option>
                  <option value="otro">Otro</option>
                </select>
                {formData.MedioContacto === 'otro' && (
                  <input
                    type="text"
                    placeholder="Especifique"
                    value={otroMedio}
                    onChange={(e) => setOtroMedio(e.target.value)}
                    className="mt-2 w-full p-3 border rounded-xl"
                    required
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Detalle de la solicitud
              </label>
              <textarea
                name="DetalleSolicitud"
                value={formData.DetalleSolicitud}
                onChange={handleChange}
                rows="5"
                required
                className="w-full p-3 border rounded-xl"
                placeholder="Explique su situación"
              ></textarea>
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800"
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
