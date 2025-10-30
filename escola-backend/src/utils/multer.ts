import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimes = [
  "image/webp",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/svg+xml",
];

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const err: any = new Error(
      "Formato de imagem inválido. Use webp, jpg, jpeg, png ou svg."
    );
    err.code = "INVALID_FILE_TYPE";
    cb(err);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});