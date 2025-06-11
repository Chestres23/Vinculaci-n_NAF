const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const asesoriaRoutes = require('./routes/asesoriaRoutes');
const boletinRoutes = require("./routes/boletinRoutes");
const libroRoutes = require("./routes/libroRoutes");
require('dotenv').config();
require('./db');
require('./scripts/createTables');

const app = express();
const port = 3001;

// ✅ CORS con configuración
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

app.use("/api/users", userRoutes);
app.use('/api/asesorias', asesoriaRoutes);
app.use("/api/boletines", boletinRoutes);
app.use("/api/libros", libroRoutes);
app.use("/uploads", express.static("uploads"));



app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
