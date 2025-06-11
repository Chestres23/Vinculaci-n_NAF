const sql = require('mssql');
require ('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,   
    options: {
        encrypt: true, //Usa true si usas Azure
        trustServerCertificate: false // Cambia esto según tu configuración
    }
};

const poolPromise = sql.connect(dbConfig).then(pool => {
    console.log('Conectado a la Base de Datos:', process.env.DB_DATABASE);
    return pool;
}).catch(err => {
    console.error('Database connection failed: ', err);
    throw err;
});

module.exports = {
    sql, poolPromise
};
