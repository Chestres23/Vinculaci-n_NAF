const { poolPromise } = require("../db");
const axios = require("axios");
const { cloudinary } = require("../utils/cloudinary");
const {
  uploadToCloudinary,
  getPublicIdFromUrl,
} = require("../utils/cloudinaryHelper");

// Crear libro
async function crearLibro(req, res) {
  const { titulo, autor, descripcion, fechaPublicacion, tipo, subidoPor } =
    req.body;
  const archivo = req.file;

  if (!archivo) return res.status(400).json({ error: "Archivo PDF requerido" });

  try {
    console.log(`📁 Intentando subir: ${archivo.originalname}...`);

    const rutaPdf = await uploadToCloudinary(
      archivo.buffer,
      "biblioteca",
      archivo.originalname
    );

    console.log("✅ Ruta final del PDF:", rutaPdf);

    const pool = await poolPromise;
    await pool
      .request()
      .input("titulo", titulo)
      .input("autor", autor)
      .input("descripcion", descripcion)
      .input("fechaPublicacion", fechaPublicacion)
      .input("tipo", tipo)
      .input("rutaPdf", rutaPdf)
      .input("subidoPor", subidoPor).query(`
        INSERT INTO Libro (Titulo, Autor, Descripcion, FechaPublicacion, Tipo, RutaPdf, SubidoPor)
        VALUES (@titulo, @autor, @descripcion, @fechaPublicacion, @tipo, @rutaPdf, @subidoPor)
      `);

    res.status(201).json({ message: "Libro subido correctamente" });
  } catch (error) {
    console.error("❌ Error al crear libro:", error);
    res.status(500).json({ error: "Error inesperado" });
  }
}

// Obtener todos los libros con datos del usuario que los subió
async function obtenerLibros(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        l.*, 
        u.Nombre, 
        u.Apellido, 
        u.Username
      FROM Libro l
      LEFT JOIN Usuario u ON l.SubidoPor = u.Id
      ORDER BY l.FechaPublicacion DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener libros:", error);
    res.status(500).json({ error: "Error al obtener libros" });
  }
}

// Actualizar libro
async function actualizarLibro(req, res) {
  const { id } = req.params;
  const { titulo, autor, descripcion, fechaPublicacion, tipo } = req.body;
  const archivo = req.file;

  try {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT RutaPdf FROM Libro WHERE Id = @id");

    if (result.recordset.length === 0)
      return res.status(404).json({ error: "Libro no encontrado" });

    const rutaAnterior = result.recordset[0].RutaPdf;
    let nuevaRutaPdf = rutaAnterior;

    if (archivo) {
      const publicId = getPublicIdFromUrl(rutaAnterior);
      await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });

      nuevaRutaPdf = await uploadToCloudinary(
        archivo.buffer,
        "biblioteca",
        archivo.originalname
      );
    }

    await pool
      .request()
      .input("id", id)
      .input("titulo", titulo)
      .input("autor", autor)
      .input("descripcion", descripcion)
      .input("fechaPublicacion", fechaPublicacion)
      .input("tipo", tipo)
      .input("rutaPdf", nuevaRutaPdf).query(`
        UPDATE Libro
        SET Titulo = @titulo,
            Autor = @autor,
            Descripcion = @descripcion,
            FechaPublicacion = @fechaPublicacion,
            Tipo = @tipo,
            RutaPdf = @rutaPdf
        WHERE Id = @id
      `);

    res.status(200).json({ message: "Libro actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar libro:", error);
    res.status(500).json({ error: "Error al actualizar libro" });
  }
}

// Eliminar libro
async function eliminarLibro(req, res) {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", id)
      .query("SELECT RutaPdf FROM Libro WHERE Id = @id");

    if (result.recordset.length === 0) {
      console.warn("⚠️ Libro no encontrado con ID:", id);
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    const rutaPdf = result.recordset[0].RutaPdf;
    console.log("📁 Ruta del PDF obtenida:", rutaPdf);

    const publicId = getPublicIdFromUrl(rutaPdf); // contiene carpeta y .pdf
    console.log("🔎 public_id limpio:", publicId);

    const deleteResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw"
    });
    console.log("📤 Resultado de eliminación Cloudinary:", deleteResult);

    await pool
      .request()
      .input("id", id)
      .query("DELETE FROM Libro WHERE Id = @id");

    console.log("✅ Registro eliminado de la base de datos.");
    res.json({ message: "Libro y archivo eliminados correctamente" });
  } catch (error) {
    console.error("❌ Error general en eliminarLibro:", error);
    res.status(500).json({ error: "Error al eliminar libro" });
  }
}


module.exports = {
  crearLibro,
  obtenerLibros,
  actualizarLibro,
  eliminarLibro,
};
