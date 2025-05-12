const express = require('express');
const cors = require('cors');
// const userRoutes = require('./routes/userRoutes'); // Importar las rutas de usuario
// const departmentRoutes = require('./routes/departmentRoutes');
// const documentRoutes = require('./routes/documentRoutes');
// const documentTypeRoutes = require('./routes/documentTypeRoutes'); // Importar las rutas de tipos de documentos
require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Hola, Mundo!');
});



// Usar las rutas de usuario
// app.use('/api', userRoutes);
// app.use('/api', departmentRoutes);
// app.use('/api/documents', documentRoutes);
// // Usar rutas de tipos de documentos
// app.use('/api/document-types', documentTypeRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
