const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  crearLibro,
  obtenerLibros,
  actualizarLibro,
  eliminarLibro
} = require("../controllers/libroController");

// ⚙️ Configuración multer para memoria (Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📚 Rutas para libros
router.post("/crear", upload.single("archivoPdf"), crearLibro);
router.get("/ver", obtenerLibros);
router.put("/editar/:id", upload.single("archivoPdf"), actualizarLibro);
router.delete("/eliminar/:id", eliminarLibro);

module.exports = router;
