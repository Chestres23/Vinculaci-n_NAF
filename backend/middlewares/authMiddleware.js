const admin = require("../config/firebaseAdminConfig");
const { sql, poolPromise } = require("../db");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.uid = decodedToken.uid;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("firebase_uid", sql.NVarChar, req.uid)
      .query("SELECT Rol_id FROM Usuario WHERE FirebaseUid = @firebase_uid");

    if (result.recordset.length === 0) {
      return res.status(403).json({ error: "Usuario no encontrado" });
    }

    req.rol = result.recordset[0].Rol_id;
    next();
  } catch (error) {
    console.error("Error de autenticación:", error);
    res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = { authenticate };
