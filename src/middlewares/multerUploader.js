import multer from "multer";
import path from "path";
import fs from "fs";

function cloudinaryUploader(folderName) {
  const uploadDir = "uploads";

  // ensure uploads folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueName =
        file.fieldname +
        "-" +
        Date.now() +
        path.extname(file.originalname);
      cb(null, uniqueName);
    },
  });

  function fileFilter(req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(
        new Error("Invalid file type. Only JPEG and PNG are allowed."),
        false
      );
    }
  }

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  });
}

export default cloudinaryUploader;
