const { cloudinary } = require("./cloudinary");
const streamifier = require("streamifier");

// Subir archivo a Cloudinary (tipo raw porque es PDF)
const uploadToCloudinary = (fileBuffer, folderName, filenameWithExtension) => {
  const publicId = filenameWithExtension.replace(/\.[^/.]+$/, ""); // sin extensión
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: folderName,          // ✅ Solo una vez 'biblioteca'
        public_id: publicId,         // ✅ Solo nombre limpio
        use_filename: true,
        unique_filename: false,
        format: "pdf"
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};


// Extraer el public_id desde una URL
// utils/cloudinaryHelper.js
function getPublicIdFromUrl(url, folder = "biblioteca") {
  try {
    const parts = new URL(url).pathname.split("/");

    const filenameWithExt = decodeURIComponent(parts.pop()); // ej: Title (7).pdf
    const folderName = parts[parts.length - 1]; // ej: biblioteca

    const publicId = `${folder}/${filenameWithExt}`; // ✅ incluye la extensión .pdf
    console.log("✅ public_id generado:", publicId);
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
