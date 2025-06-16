const { cloudinary } = require("./cloudinary");
const streamifier = require("streamifier");
const fetch = require("node-fetch"); // Asegúrate de tener instalado node-fetch

// ✅ Verifica si la URL del archivo existe realmente en Cloudinary
const fileExistsByUrl = async (folder, publicIdWithExt) => {
  const fullUrl = `https://res.cloudinary.com/${cloudinary.config().cloud_name}/raw/upload/${folder}/${encodeURIComponent(publicIdWithExt)}`;
  try {
    const res = await fetch(fullUrl, { method: "HEAD" });
    return res.status === 200;
  } catch (error) {
    console.error("❌ Error verificando URL Cloudinary:", error);
    return false;
  }
};

// ✅ Genera un nombre tipo archivo, archivo[1], archivo[2], etc.
const generateSafePublicId = async (folder, baseName, ext) => {
  let count = 0;
  let candidate = `${baseName}.${ext}`;

  while (await fileExistsByUrl(folder, candidate)) {
    count++;
    candidate = `${baseName}[${count}].${ext}`;
  }

  const publicId = candidate.replace(/\.[^/.]+$/, ""); // sin extensión
  console.log(`📁 Nombre final disponible: ${publicId}`);
  return publicId;
};

// ✅ Subir archivo con sufijo si existe
const uploadToCloudinary = async (fileBuffer, folderName, filenameWithExtension) => {
  const baseName = filenameWithExtension.replace(/\.[^/.]+$/, "");
  const ext = filenameWithExtension.split('.').pop();

  const publicId = await generateSafePublicId(folderName, baseName, ext);

  console.log(`📤 Subiendo archivo como public_id: ${publicId}`);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: folderName,
        public_id: publicId,
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

// ✅ Extraer public_id desde URL para eliminar
function getPublicIdFromUrl(url) {
  try {
    const parts = new URL(url).pathname.split("/");
    const folder = parts[parts.length - 2]; // obtiene "boletines" o "biblioteca"
    const filenameWithExt = decodeURIComponent(parts.pop()); // ej: archivo[1].pdf
    const publicId = `${folder}/${filenameWithExt.replace(/\.[^/.]+$/, "")}`;
    console.log("🔎 Extraído public_id completo:", publicId);
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
