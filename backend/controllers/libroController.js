const fs = require("fs");
const path = require("path");
const { poolPromise } = require("../db");

// Crear libro
async function crearLibro(req, res) {
  const { titulo, autor, descripcion, fechaPublicacion, tipo, subidoPor } = req.body;
  const archivo = req.file;

  if (!archivo) return res.status(400).json({ error: "Archivo PDF requerido" });

  const rutaPdf = `/uploads/libros/${archivo.filename}`;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("titulo", titulo)
      .input("autor", autor)
      .input("descripcion", descripcion)
      .input("fechaPublicacion", fechaPublicacion)
      .input("tipo", tipo)
      .input("subidoPor", subidoPor)
      .input("rutaPdf", rutaPdf)
      .query(`
        INSERT INTO Libro (Titulo, Autor, Descripcion, FechaPublicacion, Tipo, RutaPdf, SubidoPor)
        VALUES (@titulo, @autor, @descripcion, @fechaPublicacion, @tipo, @rutaPdf, @subidoPor)

      `);
    res.status(201).json({ message: "Libro subido correctamente" });
  } catch (error) {
    console.error("Error al crear libro:", error);
    res.status(500).json({ error: "Error al crear libro" });
  }
}

// Obtener todos
async function obtenerLibros(req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Libro ORDER BY FechaPublicacion DESC");
    res.json(result.recordset);
  } catch (error) {
    console.error("Error al obtener libros:", error);
    res.status(500).json({ error: "Error al obtener libros" });
  }
}

// Actualizar libro
async function actualizarLibro(req, res) {
  const { id } = req.params;
  const { titulo, autor, descripcion, fechaPublicacion, tipo, rutaPdf } = req.body;
  const archivo = req.file;

  try {
    const pool = await poolPromise;

    // Obtener ruta anterior
    const result = await pool.request()
      .input("id", id)
      .query("SELECT RutaPdf FROM Libro WHERE Id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    const rutaAnterior = result.recordset[0].RutaPdf;
    const nuevaRutaPdf = archivo ? `/uploads/libros/${archivo.filename}` : rutaPdf;

    if (archivo) {
      const rutaFisica = path.join(__dirname, "..", rutaAnterior);
      if (fs.existsSync(rutaFisica)) fs.unlinkSync(rutaFisica);
    }

    await pool.request()
      .input("id", id)
      .input("titulo", titulo)
      .input("autor", autor)
      .input("descripcion", descripcion)
      .input("fechaPublicacion", fechaPublicacion)
      .input("tipo", tipo)
      .input("rutaPdf", nuevaRutaPdf)
      .query(`
        UPDATE Libro
        SET Titulo = @titulo,
            Autor = @autor,
            Descripcion = @descripcion,
            FechaPublicacion = @fechaPublicacion,
            Tipo = @tipo,
            RutaPdf = @rutaPdf
        WHERE Id = @id
      `);

    res.json({ message: "Libro actualizado correctamente" });
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

    const result = await pool.request()
      .input("id", id)
      .query("SELECT RutaPdf FROM Libro WHERE Id = @id");

    if (result.recordset.length === 0) return res.status(404).json({ error: "Libro no encontrado" });

    const rutaFisica = path.join(__dirname, "..", result.recordset[0].RutaPdf);
    if (fs.existsSync(rutaFisica)) fs.unlinkSync(rutaFisica);

    await pool.request()
      .input("id", id)
      .query("DELETE FROM Libro WHERE Id = @id");

    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar libro:", error);
    res.status(500).json({ error: "Error al eliminar libro" });
  }
}

module.exports = {
  crearLibro,
  obtenerLibros,
  actualizarLibro,
  eliminarLibro
};
