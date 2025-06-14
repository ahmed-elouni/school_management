import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    return cb(new Error('Seules les images sont autorisées'), false);
  }
  cb(null, true);
};

export default multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});