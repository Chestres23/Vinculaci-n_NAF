const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  crearLibro,
  obtenerLibros,
  actualizarLibro,
  eliminarLibro
} = require("../controllers/libroController");

// Crear carpeta si no existe
const fs = require("fs");
const dir = "uploads/libros";
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Configuración multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"))
});
const upload = multer({ storage });

router.post("/crear", upload.single("archivoPdf"), crearLibro);
router.get("/ver", obtenerLibros);
router.put("/editar/:id", upload.single("archivoPdf"), actualizarLibro);
router.delete("/eliminar/:id", eliminarLibro);

module.exports = router;
