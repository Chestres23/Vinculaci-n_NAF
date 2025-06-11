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
  console.log("📥 Datos recibidos del frontend:", req.body); // 🔍 VERIFICACIÓN

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

    console.log("🔍 Verificando si el correo ya existe...");

    const exists = await pool
      .request()
      .input("correo", sql.NVarChar, correo)
      .query("SELECT 1 FROM Usuario WHERE Correo = @correo");

    if (exists.recordset.length > 0) {
      console.warn("⚠️ Correo ya existente:", correo);
      return res.status(400).json({ error: "El correo ya existe en la base de datos" });
    }

    console.log("✅ Insertando nuevo usuario...");

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

    console.log("✅ Usuario insertado correctamente");
    res.status(201).json({ message: "Usuario registrado en la base de datos" });

  } catch (error) {
    console.error("❌ Error al guardar usuario:", error);
    res.status(500).json({ error: "Error del servidor", detalle: error.message });
  }
};

// Crear usuario con admin
const createUserAdmin = async (req, res) => {
  console.log("📥 Datos recibidos del frontend:", req.body);

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
    password, // ⚠️ Asegúrate de que venga del formulario
  } = req.body;

  try {
    const pool = await poolPromise;

    console.log("🔍 Verificando si el correo ya existe...");
    const exists = await pool
      .request()
      .input("correo", sql.NVarChar, correo)
      .query("SELECT 1 FROM Usuario WHERE Correo = @correo");

    if (exists.recordset.length > 0) {
      console.warn("⚠️ Correo ya existente:", correo);
      return res.status(400).json({ error: "El correo ya existe en la base de datos" });
    }

    // 1️⃣ Crear usuario en Firebase
    let firebaseUser;
    try {
      firebaseUser = await admin.auth().createUser({
        email: correo,
        password,
        displayName: `${capitalize(nombre)} ${capitalize(apellido)}`,
      });
    } catch (firebaseError) {
      console.error("❌ Error al crear usuario en Firebase:", firebaseError);
      return res.status(500).json({ error: "Error al crear usuario en Firebase", detalle: firebaseError.message });
    }

    const uid = firebaseUser.uid;

    // 2️⃣ Insertar en base de datos
    console.log("✅ Insertando nuevo usuario en base de datos...");

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

    console.log("✅ Usuario registrado exitosamente");
    res.status(201).json({ message: "Usuario registrado correctamente", uid });
  } catch (error) {
    console.error("❌ Error al guardar usuario:", error);
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
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
  nombre, segundoNombre, apellido, segundoApellido,
  correo, telefono, ciudad, tipoContribuyente, rol_id,
  cedulaRUC
} = req.body;


  try {
    const pool = await poolPromise;

    // 🔍 Obtener el UID de Firebase desde la base de datos
    const uidResult = await pool.request()
      .input("id", sql.UniqueIdentifier, id)
      .query('SELECT FirebaseUid FROM Usuario WHERE id = @id');

    if (uidResult.recordset.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado en la base de datos' });
    }

    const firebaseUid = uidResult.recordset[0].FirebaseUid;

    // 🔁 Actualizar el correo en Firebase Authentication
    try {
      await admin.auth().updateUser(firebaseUid, { email: correo });
    } catch (firebaseError) {
      console.error("❌ Error al actualizar correo en Firebase:", firebaseError);
      return res.status(500).json({ error: 'No se pudo actualizar el correo en Firebase' });
    }

    // ✅ Actualizar en la base de datos
    await pool.request()
      .input("id", sql.UniqueIdentifier, id)
      .input('Nombre', sql.NVarChar, capitalize(nombre))
      .input('SegundoNombre', sql.NVarChar, capitalize(segundoNombre))
      .input('Apellido', sql.NVarChar, capitalize(apellido))
      .input('SegundoApellido', sql.NVarChar, capitalize(segundoApellido))
      .input('Correo', sql.NVarChar, correo)
      .input('Telefono', sql.NVarChar, telefono)
      .input('CedulaRUC', sql.NVarChar, cedulaRUC)
      .input('Ciudad', sql.NVarChar, ciudad)
      .input('TipoContribuyente', sql.NVarChar, tipoContribuyente)
      .input('Rol_id', sql.Int, rol_id)
      .query(`
        UPDATE Usuario SET
          Nombre = @Nombre, SegundoNombre = @SegundoNombre,
          Apellido = @Apellido, SegundoApellido = @SegundoApellido,
          Correo = @Correo, CedulaRUC = @CedulaRUC,
          Telefono = @Telefono, Ciudad = @Ciudad,
          TipoContribuyente = @TipoContribuyente, Rol_id = @Rol_id
        WHERE id = @id
      `);

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: 'Error del servidor' });
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
};
