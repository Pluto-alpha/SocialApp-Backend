import multer from 'multer'
import path from 'path';


const storage = multer.diskStorage({
    destination: 'public',
    filename: function (req, file, cb) {
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + fileExtension);
    },
});
const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
        return cb(new Error('Only upload files with jpg, jpeg and png format.'));
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});
export default upload;