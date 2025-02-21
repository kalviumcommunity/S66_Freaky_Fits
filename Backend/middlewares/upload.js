const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
 
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname);
    const timestamp = Date.now();
    cb(null, timestamp + fileExtension);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
