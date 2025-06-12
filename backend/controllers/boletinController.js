const { poolPromise } = require("../db");
const { cloudinary } = require("../utils/cloudinary");
const { uploadToCloudinary, getPublicIdFromUrl } = require("../utils/cloudinaryHelper");

// Crear boletín
async function crearBoletin(req, res) {
  const { titulo, descripcion, fechaPublicacion, subidoPor } = req.body;
  const archivo = req.file;

  if (!archivo) return res.status(400).json({ error: "No se subió ningún archivo" });

  try {
    const rutaPdf = await uploadToCloudinary(archivo.buffer, "boletines", archivo.originalname);

    const pool = await poolPromise;
    await pool.request()
      .input("titulo", titulo)
      .input("descripcion", descripcion)
      .input("fechaPublicacion", fechaPublicacion)
      .input("rutaPdf", rutaPdf)
      .input("subidoPor", subidoPor)
      .query(`
        INSERT INTO Boletin (Titulo, Descripcion, FechaPublicacion, RutaPdf, SubidoPor)
        VALUES (@titulo, @descripcion, @fechaPublicacion, @rutaPdf, @subidoPor)
      `);

    res.status(201).json({ message: "Boletín creado correctamente" });

  } catch (error) {
    console.error("❌ Error al crear boletín:", error);
    res.status(500).json({ error: "Error al crear boletín" });
  }
}

// Obtener todos los boletines
async function obtenerBoletines(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Boletin ORDER BY FechaPublicacion DESC");
    res.json(result.recordset);
  } catch (error) {
    console.error("❌ Error al obtener boletines:", error);
    res.status(500).json({ error: "Error al obtener boletines" });
  }
}

// Actualizar boletín
async function actualizarBoletin(req, res) {
  const { id } = req.params;
  const { titulo, descripcion, fechaPublicacion } = req.body;
  const archivo = req.file;

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("id", id)
      .query("SELECT RutaPdf FROM Boletin WHERE Id = @id");

    if (result.recordset.length === 0)
      return res.status(404).json({ error: "Boletín no encontrado" });

    const rutaActual = result.recordset[0].RutaPdf;
    let nuevaRutaPdf = rutaActual;

    if (archivo) {
      const publicId = getPublicIdFromUrl(rutaActual, "boletines");
      await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });

      nuevaRutaPdf = await uploadToCloudinary(archivo.buffer, "boletines", archivo.originalname);
    }

    await pool.request()
      .input("id", id)
      .input("titulo", titulo)
      .input("descripcion", descripcion)
      .input("fechaPublicacion", fechaPublicacion)
      .input("rutaPdf", nuevaRutaPdf)
      .query(`
        UPDATE Boletin
        SET Titulo = @titulo,
            Descripcion = @descripcion,
            FechaPublicacion = @fechaPublicacion,
            RutaPdf = @rutaPdf
        WHERE Id = @id
      `);

    res.status(200).json({ message: "Boletín actualizado correctamente" });

  } catch (error) {
    console.error("❌ Error al actualizar boletín:", error);
    res.status(500).json({ error: "Error al actualizar boletín" });
  }
}

// Eliminar boletín
async function eliminarBoletin(req, res) {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("id", id)
      .query("SELECT RutaPdf FROM Boletin WHERE Id = @id");

    if (result.recordset.length === 0)
      return res.status(404).json({ error: "Boletín no encontrado" });

    const rutaPdf = result.recordset[0].RutaPdf;
    const publicId = getPublicIdFromUrl(rutaPdf, "boletines");

    console.log("🗑️ Eliminando boletín en Cloudinary:", publicId);

    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });

    await pool.request().input("id", id).query("DELETE FROM Boletin WHERE Id = @id");

    res.status(200).json({ message: "Boletín y archivo eliminados correctamente" });

  } catch (error) {
    console.error("❌ Error al eliminar boletín:", error);
    res.status(500).json({ error: "Error al eliminar boletín" });
  }
}

module.exports = {
  crearBoletin,
  obtenerBoletines,
  actualizarBoletin,
  eliminarBoletin
};
