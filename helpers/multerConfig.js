const multer = require('multer');

module.exports = (folderName, filePrefix = 'file') => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `./uploads/${folderName}/`);
    },
    filename: (req, file, cb) => {
      cb(null, `${filePrefix}-${Date.now()}-${file.originalname}`);
    }
  });

  return multer({ storage });
};