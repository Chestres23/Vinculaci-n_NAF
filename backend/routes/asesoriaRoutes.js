const express = require('express');
const router = express.Router();
const { guardarAsesoria, obtenerAsesorias, marcarAsesoriaRealizada, eliminarAsesoria, eliminarAsesoriasRealizadas, eliminarTodasAsesorias } = require('../controllers/asesoriaController');

// Ruta para guardar una nueva asesoría
router.post('/nueva', guardarAsesoria);

// Ruta para obtener todas las asesorías
router.get('/todas', obtenerAsesorias);

// Ruta para marcar una asesoría como realizada
router.put("/marcar/:id", marcarAsesoriaRealizada);

// Ruta para eliminar una asesoría
router.delete('/eliminar/:id', eliminarAsesoria);

router.delete("/eliminar-realizadas", eliminarAsesoriasRealizadas);
router.delete("/eliminar-todas", eliminarTodasAsesorias);


module.exports = router;
