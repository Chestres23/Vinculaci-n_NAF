const { sql, poolPromise } = require("../db");
const { enviarCorreoAsesoria } = require("../utils/emailSender");

const guardarAsesoria = async (req, res) => {
  const {
    UsuarioId,
    Nombre,
    CedulaRUC,
    Correo,
    Telefono,
    Ciudad,
    TipoServicio,
    TipoContribuyente,
    Discapacidad,
    MedioContacto,
    DetalleSolicitud,
  } = req.body;

  try {
    const pool = await poolPromise;

    // Insertar asesoría y obtener el ID generado
    const insertResult = await pool
      .request()
      .input("UsuarioId", sql.UniqueIdentifier, UsuarioId || null)
      .input("Nombre", sql.NVarChar, Nombre)
      .input("CedulaRUC", sql.NVarChar, CedulaRUC)
      .input("Correo", sql.NVarChar, Correo)
      .input("Telefono", sql.NVarChar, Telefono)
      .input("Ciudad", sql.NVarChar, Ciudad)
      .input("TipoServicio", sql.NVarChar, TipoServicio)
      .input("TipoContribuyente", sql.NVarChar, TipoContribuyente)
      .input("Discapacidad", sql.Bit, Discapacidad === "si" ? 1 : 0)
      .input("MedioContacto", sql.NVarChar, MedioContacto)
      .input("DetalleSolicitud", sql.Text, DetalleSolicitud)
      .input("Realizada", sql.Bit, 0)
      .input("FechaRealizacion", sql.DateTime, null)
      .query(`
        DECLARE @newId UNIQUEIDENTIFIER = NEWID();
        INSERT INTO Asesoria (
          Id, UsuarioId, Nombre, CedulaRUC, Correo, Telefono, Ciudad,
          TipoServicio, TipoContribuyente, Discapacidad, MedioContacto,
          DetalleSolicitud, Realizada, FechaRealizacion
        )
        VALUES (
          @newId, @UsuarioId, @Nombre, @CedulaRUC, @Correo, @Telefono, @Ciudad,
          @TipoServicio, @TipoContribuyente, @Discapacidad, @MedioContacto,
          @DetalleSolicitud, @Realizada, @FechaRealizacion
        );
        SELECT @newId AS Id;
      `);

    const nuevaAsesoriaId = insertResult.recordset[0].Id;

    try {
      await enviarCorreoAsesoria(req.body);
      res.status(201).json({ message: "Asesoría registrada correctamente" });
    } catch (correoError) {
      // Si falla el correo, elimina la asesoría recién creada
      await pool
        .request()
        .input("Id", sql.UniqueIdentifier, nuevaAsesoriaId)
        .query("DELETE FROM Asesoria WHERE Id = @Id");

      console.error("❌ Error al enviar correo, asesoría eliminada:", correoError);
      res.status(500).json({
        error: "Error al enviar correo. La asesoría fue descartada.",
      });
    }
  } catch (error) {
    console.error("❌ Error al guardar asesoría:", error);
    res.status(500).json({ error: "Error al guardar asesoría" });
  }
};

const obtenerAsesorias = async (req, res) => {
  try {
    const pool = await poolPromise;

    const result = await pool.request().query(`
      SELECT 
        a.Id,
        a.UsuarioId,
        a.Nombre,
        a.CedulaRUC,
        a.Correo,
        a.Telefono,
        a.Ciudad,
        a.TipoServicio,
        a.TipoContribuyente,
        a.Discapacidad,
        a.MedioContacto,
        a.DetalleSolicitud,
        a.Realizada,
        a.FechaRealizacion,
        u.Username AS UsuarioUsername,
        u.Nombre AS UsuarioNombre,
        u.SegundoNombre AS UsuarioSegundoNombre,
        u.Apellido AS UsuarioApellido,
        u.SegundoApellido AS UsuarioSegundoApellido,
        u.Correo AS UsuarioCorreo,
        u.rol_id AS UsuarioRol
      FROM Asesoria a
      LEFT JOIN Usuario u ON a.UsuarioId = u.Id
      ORDER BY a.Id DESC
    `);

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("❌ Error al obtener asesorías:", error);
    res.status(500).json({ mensaje: "Error al obtener las asesorías" });
  }
};

const marcarAsesoriaRealizada = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.UniqueIdentifier, id)
      .input("Realizada", sql.Bit, 1)
      .input("FechaRealizacion", sql.DateTime, new Date()).query(`
        UPDATE Asesoria
        SET Realizada = @Realizada,
            FechaRealizacion = @FechaRealizacion
        WHERE Id = @id
      `);

    res.status(200).json({ message: "Asesoría marcada como realizada" });
  } catch (error) {
    console.error("Error al actualizar asesoría:", error);
    res.status(500).json({ error: "Error al actualizar asesoría" });
  }
};

const eliminarAsesoria = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.UniqueIdentifier, id)
      .query("DELETE FROM Asesoria WHERE Id = @id");

    res.status(200).json({ message: "Asesoría eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar asesoría:", error);
    res.status(500).json({ error: "No se pudo eliminar la asesoría" });
  }
};

const eliminarAsesoriasRealizadas = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().query(`DELETE FROM Asesoria WHERE Realizada = 1`);

    res.status(200).json({ message: "Asesorías realizadas eliminadas" });
  } catch (error) {
    console.error("Error al eliminar asesorías realizadas:", error);
    res.status(500).json({ error: "Error al eliminar realizadas" });
  }
};

const eliminarTodasAsesorias = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request().query(`DELETE FROM Asesoria`);
    res.status(200).json({ message: "Todas las asesorías eliminadas" });
  } catch (error) {
    console.error("Error al eliminar todas las asesorías:", error);
    res.status(500).json({ error: "Error al eliminar todas" });
  }
};

module.exports = {
  guardarAsesoria,
  obtenerAsesorias,
  marcarAsesoriaRealizada,
  eliminarAsesoria,
  eliminarAsesoriasRealizadas,
  eliminarTodasAsesorias,
};
