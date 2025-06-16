const { cloudinary } = require("./cloudinary");
const streamifier = require("streamifier");
const fetch = require("node-fetch");

// Verifica si un archivo existe en Cloudinary por URL HEAD
const fileExistsByUrl = async (folder, filenameWithExt) => {
  const publicId = `${folder}/${filenameWithExt}`.replace(".pdf", ""); // ⚠️ Solo quita .pdf si está presente

  try {
    await cloudinary.api.resource(publicId, {
      resource_type: "raw"
    });
    return true;
  } catch (error) {
    if (error.http_code === 404) return false;
    console.error("❌ Error real verificando archivo:", error);
    return false;
  }
};



// Genera public_id con extensión incluida y corchetes si hay repetidos
const generateSafePublicId = async (folder, baseName, ext) => {
  try {
    const resources = await cloudinary.search
      .expression(`resource_type:raw AND folder:${folder} AND filename:${baseName}*`)
      .execute();

    const existingNames = resources.resources.map(r => r.public_id.split("/").pop());

    let candidate = `${baseName}.${ext}`;
    let count = 1;

    while (existingNames.includes(candidate)) {
      candidate = `${baseName}[${count}].${ext}`;
      count++;
    }

    console.log(`📁 Nombre final disponible: ${candidate}`);
    return candidate; // solo el nombre (sin carpeta)
  } catch (error) {
    console.error("❌ Error buscando recursos:", error);
    return `${baseName}.${ext}`;
  }
};



// Subir archivo .pdf con nombre seguro
const uploadToCloudinary = async (fileBuffer, folderName, filenameWithExtension) => {
  const baseName = filenameWithExtension.replace(/\.[^/.]+$/, "");
  const ext = filenameWithExtension.split('.').pop();

  // ⚠️ Genera solo el nombre del archivo, sin carpeta
  const publicId = await generateSafePublicId(folderName, baseName, ext); // e.g. "tapi9gqjze4awthjxai1[1].pdf"

  console.log(`📤 Subiendo archivo como public_id: ${publicId} dentro de folder: ${folderName}`);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: folderName,         // ✅ Carpeta real en Cloudinary
        public_id: publicId,        // ✅ Solo nombre con extensión
        use_filename: false,
        unique_filename: false,
        format: ext
      },
      (error, result) => {
        if (error) {
          console.error("❌ Error al subir a Cloudinary:", error);
          reject(error);
        } else {
          console.log("✅ Subida completada. URL:", result.secure_url);
          resolve(result.secure_url);
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};



// Extrae el public_id INCLUYENDO la extensión .pdf y carpeta
function getPublicIdFromUrl(url) {
  try {
    const parts = new URL(url).pathname.split("/");
    const folder = parts[parts.length - 2]; // e.g. "biblioteca"
    const filenameWithExt = decodeURIComponent(parts.pop()); // e.g. archivo[2].pdf
    const publicId = `${folder}/${filenameWithExt}`; // ✅ INCLUYE .pdf
    console.log("🔎 public_id generado:", publicId);
    return publicId;
  } catch (err) {
    console.error("❌ Error extrayendo public_id:", err);
    return null;
  }
}

module.exports = {
  uploadToCloudinary,
  getPublicIdFromUrl
};
