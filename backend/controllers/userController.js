const { sql, poolPromise } = require("../db");
const admin = require("../config/firebaseAdminConfig");


// Función para obtener el grupo de usuario por UID de Firebase
const getUserRole = async (req, res) => {
  const { uid } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("firebase_uid", sql.NVarChar, uid)
      .query("SELECT rol_id FROM Usuario WHERE FirebaseUid = @firebase_uid");

    if (result.recordset.length > 0) {
      res.json({ rol: result.recordset[0].rol_id });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Función para obtener los datos de usuario por UID de Firebase
const getUserByUID = async (req, res) => {
  const { uid } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("firebase_uid", sql.NVarChar, uid)
      .query("SELECT * FROM Usuario WHERE FirebaseUid = @firebase_uid");

    if (result.recordset.length > 0) {
      res.json(result.recordset[0]);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener usuario por UID:", error);
    res.status(500).send("Error del servidor");
  }
};

// Función para capitalizar nombres
const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Crear usuario nuevo
const createUser = async (req, res) => {
  const {
    uid,
    nombre,
    segundoNombre,
    apellido,
    segundoApellido,
    correo,
    cedulaRUC,
    telefono,
    ciudad,
    tipoContribuyente,
    username,
    rol_id,
  } = req.body;

  try {
    const pool = await poolPromise;

    const exists = await pool
      .request()
      .input("correo", sql.NVarChar, correo)
      .query("SELECT 1 FROM Usuario WHERE Correo = @correo");

    if (exists.recordset.length > 0) {
      return res.status(400).json({ error: "El correo ya existe en la base de datos" });
    }

    await pool
      .request()
      .input("FirebaseUid", sql.NVarChar, uid)
      .input("Nombre", sql.NVarChar, capitalize(nombre))
      .input("SegundoNombre", sql.NVarChar, capitalize(segundoNombre))
      .input("Apellido", sql.NVarChar, capitalize(apellido))
      .input("SegundoApellido", sql.NVarChar, capitalize(segundoApellido))
      .input("Correo", sql.NVarChar, correo)
      .input("CedulaRUC", sql.NVarChar, cedulaRUC)
      .input("Telefono", sql.NVarChar, telefono)
      .input("Ciudad", sql.NVarChar, ciudad)
      .input("TipoContribuyente", sql.NVarChar, tipoContribuyente)
      .input("Username", sql.NVarChar, username)
      .input("Rol_id", sql.Int, rol_id)
      .query(`
        INSERT INTO Usuario (
          FirebaseUid, Nombre, SegundoNombre, Apellido, SegundoApellido,
          Correo, CedulaRUC, Telefono, Ciudad, TipoContribuyente,
          Username, Rol_id, FechaRegistro
        ) VALUES (
          @FirebaseUid, @Nombre, @SegundoNombre, @Apellido, @SegundoApellido,
          @Correo, @CedulaRUC, @Telefono, @Ciudad, @TipoContribuyente,
          @Username, @Rol_id, GETDATE()
        )
      `);

    res.status(201).json({ message: "Usuario registrado en la base de datos" });

  } catch (error) {
    console.error("❌ Error al guardar usuario:", error);

    // 🔁 Intentar limpiar si se insertó algo
    if (uid) {
      try {
        const pool = await poolPromise;
        await pool.request()
          .input("FirebaseUid", sql.NVarChar, uid)
          .query("DELETE FROM Usuario WHERE FirebaseUid = @FirebaseUid");
        console.warn("🧹 Usuario eliminado de la base por error posterior");
      } catch (deleteError) {
        console.error("❌ No se pudo limpiar usuario de base:", deleteError);
      }
    }

    res.status(500).json({ error: "Error del servidor", detalle: error.message });
  }
};


// Crear usuario con admin
const createUserAdmin = async (req, res) => {
  const {
    nombre,
    segundoNombre,
    apellido,
    segundoApellido,
    correo,
    cedulaRUC,
    telefono,
    ciudad,
    tipoContribuyente,
    username,
    rol_id,
    password,
  } = req.body;

  let uidCreado = null;

  try {
    const pool = await poolPromise;

    const exists = await pool
      .request()
      .input("correo", sql.NVarChar, correo)
      .query("SELECT 1 FROM Usuario WHERE Correo = @correo");

    if (exists.recordset.length > 0) {
      return res.status(400).json({ error: "El correo ya existe en la base de datos" });
    }

    // 🔐 Crear en Firebase
    const firebaseUser = await admin.auth().createUser({
      email: correo,
      password,
      displayName: `${capitalize(nombre)} ${capitalize(apellido)}`,
    });

    uidCreado = firebaseUser.uid;

    // 📥 Insertar en base de datos
    await pool
      .request()
      .input("FirebaseUid", sql.NVarChar, uidCreado)
      .input("Nombre", sql.NVarChar, capitalize(nombre))
      .input("SegundoNombre", sql.NVarChar, capitalize(segundoNombre))
      .input("Apellido", sql.NVarChar, capitalize(apellido))
      .input("SegundoApellido", sql.NVarChar, capitalize(segundoApellido))
      .input("Correo", sql.NVarChar, correo)
      .input("CedulaRUC", sql.NVarChar, cedulaRUC)
      .input("Telefono", sql.NVarChar, telefono)
      .input("Ciudad", sql.NVarChar, ciudad)
      .input("TipoContribuyente", sql.NVarChar, tipoContribuyente)
      .input("Username", sql.NVarChar, username)
      .input("Rol_id", sql.Int, rol_id)
      .query(`
        INSERT INTO Usuario (
          FirebaseUid, Nombre, SegundoNombre, Apellido, SegundoApellido,
          Correo, CedulaRUC, Telefono, Ciudad, TipoContribuyente,
          Username, Rol_id, FechaRegistro
        ) VALUES (
          @FirebaseUid, @Nombre, @SegundoNombre, @Apellido, @SegundoApellido,
          @Correo, @CedulaRUC, @Telefono, @Ciudad, @TipoContribuyente,
          @Username, @Rol_id, GETDATE()
        )
      `);

    res.status(201).json({ message: "Usuario registrado correctamente", uid: uidCreado });

  } catch (error) {
    console.error("❌ Error al guardar usuario:", error);

    // 🧹 Borrar de la base
    if (uidCreado) {
      try {
        const pool = await poolPromise;
        await pool.request()
          .input("FirebaseUid", sql.NVarChar, uidCreado)
          .query("DELETE FROM Usuario WHERE FirebaseUid = @FirebaseUid");
        console.warn("🧹 Usuario eliminado de la base tras error");
      } catch (dbCleanError) {
        console.error("❌ Error al eliminar de base:", dbCleanError);
      }

      // 🧹 Borrar de Firebase
      try {
        await admin.auth().deleteUser(uidCreado);
        console.warn("🧹 Usuario eliminado de Firebase tras error");
      } catch (fbCleanError) {
        console.error("❌ Error al eliminar de Firebase:", fbCleanError);
      }
    }

    res.status(500).json({ error: "Error del servidor", detalle: error.message });
  }
};


// Autenticación
const authenticateUser = async (req, res) => {
  const { username } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("username", sql.NVarChar, username)
      .query("SELECT * FROM Usuario WHERE Username = @username");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result.recordset[0];
    await admin.auth().getUserByEmail(user.Correo);

    res.json({
      email: user.Correo,
      uid: user.FirebaseUid,
      rol_id: user.Rol_id,
      nombre: user.Nombre,
      username: user.Username,
    });
  } catch (error) {
    console.error("Error en autenticación:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Restablecer contraseña
const resetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    await admin.auth().generatePasswordResetLink(email);
    res.json({ message: "Enlace enviado" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al enviar enlace de restablecimiento" });
  }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT * FROM Usuario
    `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

// Actualizar usuario
// Actualizar usuario
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    nombre, segundoNombre, apellido, segundoApellido,
    correo, telefono, ciudad, tipoContribuyente, rol_id,
    cedulaRUC, username
  } = req.body;

  try {
    const pool = await poolPromise;

    // 🔍 Obtener el UID de Firebase desde la base de datos
    const uidResult = await pool.request()
      .input("id", sql.UniqueIdentifier, id)
      .query("SELECT FirebaseUid FROM Usuario WHERE id = @id");

    if (uidResult.recordset.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado en la base de datos" });
    }

    const firebaseUid = uidResult.recordset[0].FirebaseUid;

    // 🚫 Verificar si ya existe otro usuario con el mismo username
    const usernameExists = await pool.request()
      .input("username", sql.NVarChar, username)
      .input("id", sql.UniqueIdentifier, id)
      .query("SELECT 1 FROM Usuario WHERE Username = @username AND id != @id");

    if (usernameExists.recordset.length > 0) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso por otro usuario" });
    }

    // 🔁 Actualizar el correo en Firebase Authentication
    try {
      await admin.auth().updateUser(firebaseUid, { email: correo });
    } catch (firebaseError) {
      console.error("❌ Error al actualizar correo en Firebase:", firebaseError);
      return res.status(500).json({ error: "No se pudo actualizar el correo en Firebase" });
    }

    // ✅ Actualizar en la base de datos
    await pool.request()
      .input("id", sql.UniqueIdentifier, id)
      .input("Nombre", sql.NVarChar, capitalize(nombre))
      .input("SegundoNombre", sql.NVarChar, capitalize(segundoNombre))
      .input("Apellido", sql.NVarChar, capitalize(apellido))
      .input("SegundoApellido", sql.NVarChar, capitalize(segundoApellido))
      .input("Correo", sql.NVarChar, correo)
      .input("Telefono", sql.NVarChar, telefono)
      .input("CedulaRUC", sql.NVarChar, cedulaRUC)
      .input("Ciudad", sql.NVarChar, ciudad)
      .input("TipoContribuyente", sql.NVarChar, tipoContribuyente)
      .input("Rol_id", sql.Int, rol_id)
      .input("Username", sql.NVarChar, username)
      .query(`
        UPDATE Usuario SET
          Nombre = @Nombre, SegundoNombre = @SegundoNombre,
          Apellido = @Apellido, SegundoApellido = @SegundoApellido,
          Correo = @Correo, CedulaRUC = @CedulaRUC,
          Telefono = @Telefono, Ciudad = @Ciudad,
          TipoContribuyente = @TipoContribuyente,
          Rol_id = @Rol_id, Username = @Username
        WHERE id = @id
      `);

    res.json({ message: "Usuario actualizado correctamente" });

  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};



// Eliminar usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;

    // 1. Buscar UID en la base de datos por el ID GUID
    const user = await pool
      .request()
      .input("id", sql.UniqueIdentifier, id)
      .query("SELECT FirebaseUid FROM Usuario WHERE id = @id");

    if (user.recordset.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const firebaseUid = user.recordset[0].FirebaseUid;

    // 2. Eliminar en Firebase Authentication
    try {
      await admin.auth().deleteUser(firebaseUid);
    } catch (firebaseError) {
      console.error("❌ Error al eliminar en Firebase:", firebaseError);
      // Aquí puedes continuar o detener según tu lógica
    }

    // 3. Eliminar en tu base de datos
    await pool
      .request()
      .input("id", sql.UniqueIdentifier, id)
      .query("DELETE FROM Usuario WHERE id = @id");

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

const actualizarPerfilUsuario = async (req, res) => {
  const { uid } = req.params;
  const {
    nombre, segundoNombre, apellido, segundoApellido,
    cedulaRUC, telefono, ciudad, tipoContribuyente
  } = req.body;

  try {
    const pool = await poolPromise;

    await pool.request()
      .input("FirebaseUid", sql.NVarChar, uid)
      .input("Nombre", sql.NVarChar, nombre)
      .input("SegundoNombre", sql.NVarChar, segundoNombre)
      .input("Apellido", sql.NVarChar, apellido)
      .input("SegundoApellido", sql.NVarChar, segundoApellido)
      .input("CedulaRUC", sql.NVarChar, cedulaRUC)
      .input("Telefono", sql.NVarChar, telefono)
      .input("Ciudad", sql.NVarChar, ciudad)
      .input("TipoContribuyente", sql.NVarChar, tipoContribuyente)
      .query(`
        UPDATE Usuario SET
          Nombre = @Nombre,
          SegundoNombre = @SegundoNombre,
          Apellido = @Apellido,
          SegundoApellido = @SegundoApellido,
          CedulaRUC = @CedulaRUC,
          Telefono = @Telefono,
          Ciudad = @Ciudad,
          TipoContribuyente = @TipoContribuyente
        WHERE FirebaseUid = @FirebaseUid
      `);

    res.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar perfil:", error);
    res.status(500).json({ error: "Error al actualizar perfil" });
  }
};

// DELETE /api/users/perfil/:uid
const eliminarCuentaUsuario = async (req, res) => {
  const { uid } = req.params;

  try {
    const pool = await poolPromise;

    // Eliminar de Firebase
    await admin.auth().deleteUser(uid);

    // Eliminar de la base de datos
    await pool.request()
      .input("FirebaseUid", sql.NVarChar, uid)
      .query("DELETE FROM Usuario WHERE FirebaseUid = @FirebaseUid");

    res.json({ message: "Cuenta eliminada correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar cuenta:", error);
    res.status(500).json({ error: "Error al eliminar cuenta" });
  }
};

// Nueva ruta en `userController.js`
const cambiarContrasena = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    await admin.auth().updateUser(userRecord.uid, { password: newPassword });
    res.json({ message: "Contraseña actualizada en Firebase" });
  } catch (error) {
    console.error("❌ Error al actualizar contraseña:", error);
    res.status(500).json({ error: "Error al actualizar contraseña" });
  }
};


const getDashboardAccess = async (req, res) => {
  const { rol } = req;

  let redirect;
  if (rol === 1) redirect = "/dashboard-admin";
  else if (rol === 2) redirect = "/dashboard-editor";
  else if (rol === 3) redirect = "/dashboard-usuario";
  else return res.status(403).json({ error: "Rol inválido" });

  res.json({ rol, redirect });
};

module.exports = {
  getUserRole,
  createUser,
  createUserAdmin,
  authenticateUser,
  resetPassword,
  getUsers,
  getUserByUID,
  updateUser,
  deleteUser,
  getDashboardAccess,
  actualizarPerfilUsuario,
  eliminarCuentaUsuario,
  cambiarContrasena
};
