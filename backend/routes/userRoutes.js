const express = require('express');
const router = express.Router();
const {
    getUserRole,
    createUser,
    createUserAdmin,
    authenticateUser,
    resetPassword,
    getUsers,
    getUserByUID,
    updateUser,
    deleteUser,
    getDashboardAccess
} = require('../controllers/userController');

const { authenticate } = require("../middlewares/authMiddleware");

// Ruta para autenticar un usuario
router.post('/login', authenticateUser);

// Ruta para crear un usuario
router.post('/create-user', createUser);

// Ruta para crear un usuario
router.post('/create-user-admin', createUserAdmin);

// Ruta para restablecer la contraseña de un usuario
router.post('/reset-password', resetPassword);

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para obtener un usuario por su UID
router.get('/:uid', getUserByUID);

// Ruta para actualizar un usuario
router.put('/:id', updateUser);

// Ruta para eliminar un usuario
router.delete('/:id', deleteUser);

// Ruta para obtener el grupo de un usuario por su UID
router.get('/user-role/:uid', getUserRole);

router.get('/dashboard-access', authenticate, getDashboardAccess);


module.exports = router;
