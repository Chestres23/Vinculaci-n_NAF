const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const {
  crearBoletin,
  obtenerBoletines,
  actualizarBoletin,
  eliminarBoletin
} = require("../controllers/boletinController");


// Crear la carpeta si no existe
const boletinesDir = "uploads/boletines";
if (!fs.existsSync(boletinesDir)) {
  fs.mkdirSync(boletinesDir, { recursive: true });
}

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/boletines"); // Carpeta donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const isPdf = file.mimetype === "application/pdf";
    if (isPdf) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten archivos PDF."));
    }
  }
});

// Rutas
router.post("/crear", upload.single("archivoPdf"), crearBoletin); // ✅ recibe PDF
router.get("/ver", obtenerBoletines);
router.put("/editar/:id", upload.single("archivoPdf"), actualizarBoletin); // ✅ también puede recibir PDF al editar
router.delete("/eliminar/:id", eliminarBoletin);

module.exports = router;
