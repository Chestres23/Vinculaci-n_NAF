const { sql, poolPromise } = require('../db');
const admin = require('../config/firebaseAdminConfig');

// Función para obtener el grupo de usuario por UID de Firebase
const getUserGroup = async (req, res) => {
    const { uid } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('firebase_uid', sql.NVarChar, uid)
            .query('SELECT grupo FROM users WHERE firebase_uid = @firebase_uid');
        if (result.recordset.length > 0) {
            res.json({ grupo: result.recordset[0].grupo });
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Función para obtener los datos de usuario por UID de Firebase
const getUserByUID = async (req, res) => {
    const { uid } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('firebase_uid', sql.NVarChar, uid)
            .query('SELECT id, nombre, segundoNombre, apellido, segundoApellido, email, grupo, idDepartamento FROM users WHERE firebase_uid = @firebase_uid');
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Función para capitalizar las primeras letras de los nombres y apellidos
const capitalize = (str) => {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};

// Función para crear un nuevo usuario con UID de Firebase y email
const createUser = async (req, res) => {
    const { nombre, segundoNombre, apellido, segundoApellido, email, password, grupo, idDepartamento } = req.body;
    
    // Capitalizar los nombres y apellidos
    const capitalizedNombre = capitalize(nombre);
    const capitalizedSegundoNombre = capitalize(segundoNombre);
    const capitalizedApellido = capitalize(apellido);
    const capitalizedSegundoApellido = capitalize(segundoApellido);
    
    const iniciales = `${capitalizedNombre[0].toLowerCase()}${capitalizedSegundoNombre[0].toLowerCase()}`;
    const username = `${iniciales}.${capitalizedApellido.toLowerCase()}`;

    try {
        const pool = await poolPromise;

        // Verificar si el correo electrónico ya existe en la base de datos
        const existingUser = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM users WHERE email = @email');
        if (existingUser.recordset.length > 0) {
            return res.status(400).send('El correo electrónico ya está registrado');
        }

        // Crear usuario en Firebase
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password,
            displayName: `${capitalizedNombre} ${capitalizedApellido}`,
        });

        // Guardar usuario en la base de datos
        const result = await pool.request()
            .input('firebase_uid', sql.NVarChar, userRecord.uid)
            .input('nombre', sql.NVarChar, capitalizedNombre)
            .input('segundoNombre', sql.NVarChar, capitalizedSegundoNombre)
            .input('apellido', sql.NVarChar, capitalizedApellido)
            .input('segundoApellido', sql.NVarChar, capitalizedSegundoApellido)
            .input('username', sql.NVarChar, username)
            .input('email', sql.NVarChar, email)
            .input('grupo', sql.Int, grupo)
            .input('idDepartamento', sql.Int, idDepartamento)
            .query('INSERT INTO users (firebase_uid, nombre, segundoNombre, apellido, segundoApellido, username, email, grupo, idDepartamento) VALUES (@firebase_uid, @nombre, @segundoNombre, @apellido, @segundoApellido, @username, @email, @grupo, @idDepartamento); SELECT SCOPE_IDENTITY() AS id;');

        res.json({ id: result.recordset[0].id, firebase_uid: userRecord.uid, nombre: capitalizedNombre, segundoNombre: capitalizedSegundoNombre, apellido: capitalizedApellido, segundoApellido: capitalizedSegundoApellido, username, email, grupo, idDepartamento });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Función para autenticar usuario por username y contraseña usando Firebase
const authenticateUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM users WHERE username = @username');
        if (result.recordset.length > 0) {
            const user = result.recordset[0];

            // Iniciar sesión en Firebase con el email y contraseña
            await admin.auth().getUserByEmail(user.email);

            res.json({ email: user.email, grupo: user.grupo });
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).send('Error del servidor');
    }
};

// Función para restablecer contraseña usando el correo electrónico
const resetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        await admin.auth().sendPasswordResetEmail(email);
        res.send('Enlace de restablecimiento enviado al correo electrónico');
    } catch (error) {
        res.status(500).send('Error del servidor');
    }
};

// Función para obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT u.id, u.email, u.firebase_uid, u.grupo, u.nombre, u.apellido, u.segundoNombre, u.segundoApellido, u.username, d.Nombre AS departamentoNombre, d.Abreviatura AS departamentoAbreviatura
            FROM users u
            LEFT JOIN Departamentos d ON u.idDepartamento = d.ID
        `);
        res.json(result.recordset);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('Server error');
    }
};

// Función para actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, segundoNombre, apellido, segundoApellido, email, grupo, idDepartamento } = req.body;
    try {
        const pool = await poolPromise;

        // Obtener el usuario actual de la base de datos
        const userResult = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT email, firebase_uid FROM users WHERE id = @id');
        
        if (userResult.recordset.length === 0) {
            return res.status(404).send('User not found');
        }

        const currentUser = userResult.recordset[0];

        // Actualizar en la base de datos
        await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.NVarChar, nombre)
            .input('segundoNombre', sql.NVarChar, segundoNombre)
            .input('apellido', sql.NVarChar, apellido)
            .input('segundoApellido', sql.NVarChar, segundoApellido)
            .input('email', sql.NVarChar, email)
            .input('grupo', sql.Int, grupo)
            .input('idDepartamento', sql.Int, idDepartamento)
            .query(`
                UPDATE users
                SET nombre = @nombre, segundoNombre = @segundoNombre, apellido = @apellido, segundoApellido = @segundoApellido, email = @email, grupo = @grupo, idDepartamento = @idDepartamento
                WHERE id = @id
            `);

        // Actualizar en Firebase
        try {
            await admin.auth().updateUser(currentUser.firebase_uid, {
                displayName: `${nombre} ${apellido}`,
                email: email
            });
        } catch (firebaseError) {
            if (firebaseError.code === 'auth/user-not-found') {
                console.error('Firebase user not found, creating a new user in Firebase');
                const newUser = await admin.auth().createUser({
                    uid: currentUser.firebase_uid,
                    email: email,
                    displayName: `${nombre} ${apellido}`
                });
                console.log('New Firebase user created:', newUser);
            } else {
                throw firebaseError;
            }
        }

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Server error');
    }
};


// Función para eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('SELECT firebase_uid FROM users WHERE id = @id');
        if (result.recordset.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }

        const firebaseUid = result.recordset[0].firebase_uid;

        // Eliminar el usuario de Firebase
        await admin.auth().deleteUser(firebaseUid);

        // Eliminar el usuario de la base de datos
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM users WHERE id = @id');

        res.send('Usuario eliminado');
    } catch (error) {
        res.status(500).send('Server error');
    }
};

module.exports = {
    getUserGroup,
    createUser,
    authenticateUser,
    resetPassword,
    getUsers,
    getUserByUID,
    updateUser,
    deleteUser
};
