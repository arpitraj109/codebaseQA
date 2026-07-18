import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "storage/uploads";

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, uploadDir);
    },

    filename: (_, file, cb) => {
        const timestamp = Date.now();
        const extension = path.extname(file.originalname);

        cb(null, `${timestamp}${extension}`);
    },
});

const fileFilter = (_, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() !== ".zip") {
        return cb(new Error("Only ZIP files are allowed."));
    }

    cb(null, true);
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB
    },
});