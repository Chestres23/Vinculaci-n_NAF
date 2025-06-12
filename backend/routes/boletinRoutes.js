const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  crearBoletin,
  obtenerBoletines,
  actualizarBoletin,
  eliminarBoletin
} = require("../controllers/boletinController");

// Usar almacenamiento en memoria para enviar a Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/crear", upload.single("archivoPdf"), crearBoletin);
router.get("/ver", obtenerBoletines);
router.put("/editar/:id", upload.single("archivoPdf"), actualizarBoletin);
router.delete("/eliminar/:id", eliminarBoletin);

module.exports = router;
