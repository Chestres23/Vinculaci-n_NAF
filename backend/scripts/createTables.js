const { poolPromise } = require('../db');

async function createTables() {
  try {
    const pool = await poolPromise;

    const queries = [

      // Tabla Roles
      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Roles' AND xtype='U')
      CREATE TABLE Roles (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre VARCHAR(50) NOT NULL UNIQUE
      );`,

      // Tabla Usuario
      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Usuario' AND xtype='U')
      CREATE TABLE Usuario (
        Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
        FirebaseUid NVARCHAR(128) NOT NULL UNIQUE,
        Correo NVARCHAR(255) NOT NULL,
        Nombre NVARCHAR(100),
        Rol NVARCHAR(50),
        FechaRegistro DATETIME DEFAULT GETDATE(),
        rol_id INT,
        CedulaRUC NVARCHAR(20),
        Telefono NVARCHAR(20),
        Ciudad NVARCHAR(100),
        TipoContribuyente NVARCHAR(100),
        Username NVARCHAR(50) NOT NULL UNIQUE,
        SegundoNombre NVARCHAR(100),
        Apellido NVARCHAR(100),
        SegundoApellido NVARCHAR(100)
      );`,

      // Tabla Asesoria
      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Asesoria' AND xtype='U')
      CREATE TABLE Asesoria (
        Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
        UsuarioId UNIQUEIDENTIFIER NULL,
        Nombre NVARCHAR(100),
        CedulaRUC NVARCHAR(20),
        Correo NVARCHAR(100),
        Telefono NVARCHAR(20),
        Ciudad NVARCHAR(50),
        TipoServicio NVARCHAR(100),
        TipoContribuyente NVARCHAR(100),
        Discapacidad BIT,
        MedioContacto NVARCHAR(100),
        DetalleSolicitud TEXT,
        FechaSolicitud DATETIME DEFAULT GETDATE(),
        Realizada BIT DEFAULT 0,
        FechaRealizacion DATETIME
      );`,

      // Tabla Categoria
      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Categoria' AND xtype='U')
      CREATE TABLE Categoria (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nombre NVARCHAR(100) NOT NULL
      );`,

      // Tabla Documento
      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Documento' AND xtype='U')
      CREATE TABLE Documento (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Titulo NVARCHAR(255) NOT NULL,
        Descripcion TEXT,
        UrlPdf NVARCHAR(512) NOT NULL,
        FechaPublicacion DATE,
        CategoriaId INT,
        Tipo NVARCHAR(50),
        SubidoPor UNIQUEIDENTIFIER,
        FechaSubida DATETIME DEFAULT GETDATE()
      );`,

      // Tabla Descarga
      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Descarga' AND xtype='U')
      CREATE TABLE Descarga (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UsuarioId UNIQUEIDENTIFIER,
        DocumentoId INT,
        Fecha DATETIME DEFAULT GETDATE()
      );`,

      // Tabla Sugerencia
      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Sugerencia' AND xtype='U')
      CREATE TABLE Sugerencia (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        UsuarioId UNIQUEIDENTIFIER,
        Mensaje TEXT NOT NULL,
        Fecha DATETIME DEFAULT GETDATE()
      );`,

      // Tabla Boletin
      `IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Boletin' AND xtype='U')
      CREATE TABLE Boletin (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Titulo NVARCHAR(255) NOT NULL,
        Descripcion NVARCHAR(500),
        FechaPublicacion DATE,
        RutaPdf NVARCHAR(500),
        SubidoPor UNIQUEIDENTIFIER FOREIGN KEY REFERENCES Usuario(Id),
        FechaSubida DATETIME DEFAULT GETDATE()
      );`


      // Foreign Keys

      // Usuario.rol_id → Roles.id
      `IF NOT EXISTS (
        SELECT * FROM sys.foreign_keys WHERE name = 'FK_Usuarios_Roles'
      )
      ALTER TABLE Usuario
      ADD CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (rol_id)
      REFERENCES Roles(id);`,

      // Asesoria.UsuarioId → Usuario.Id
      `IF NOT EXISTS (
        SELECT * FROM sys.foreign_keys WHERE parent_object_id = OBJECT_ID('Asesoria') AND name = 'FK_Asesoria_Usuario'
      )
      ALTER TABLE Asesoria
      ADD CONSTRAINT FK_Asesoria_Usuario FOREIGN KEY (UsuarioId)
      REFERENCES Usuario(Id);`,

      // Documento.CategoriaId → Categoria.Id
      `IF NOT EXISTS (
        SELECT * FROM sys.foreign_keys WHERE parent_object_id = OBJECT_ID('Documento') AND name = 'FK_Documento_Categoria'
      )
      ALTER TABLE Documento
      ADD CONSTRAINT FK_Documento_Categoria FOREIGN KEY (CategoriaId)
      REFERENCES Categoria(Id);`,

      // Documento.SubidoPor → Usuario.Id
      `IF NOT EXISTS (
        SELECT * FROM sys.foreign_keys WHERE parent_object_id = OBJECT_ID('Documento') AND name = 'FK_Documento_Usuario'
      )
      ALTER TABLE Documento
      ADD CONSTRAINT FK_Documento_Usuario FOREIGN KEY (SubidoPor)
      REFERENCES Usuario(Id);`,

      // Descarga.UsuarioId → Usuario.Id
      `ALTER TABLE Descarga
      ADD CONSTRAINT FK_Descarga_Usuario FOREIGN KEY (UsuarioId)
      REFERENCES Usuario(Id);`,

      // Descarga.DocumentoId → Documento.Id
      `ALTER TABLE Descarga
      ADD CONSTRAINT FK_Descarga_Documento FOREIGN KEY (DocumentoId)
      REFERENCES Documento(Id);`,

      // Sugerencia.UsuarioId → Usuario.Id
      `ALTER TABLE Sugerencia
      ADD CONSTRAINT FK_Sugerencia_Usuario FOREIGN KEY (UsuarioId)
      REFERENCES Usuario(Id);`
    ];

    for (const query of queries) {
      await pool.request().query(query);
    }

    console.log("✅ Todas las tablas y relaciones fueron creadas si no existían.");
  } catch (err) {
    console.error("❌ Error al crear las tablas:", err);
  }
}

createTables();
