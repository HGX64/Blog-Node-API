const multer = require('multer');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Multer config
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Image processing
const processAvatar = async (buffer) => {
    const filename = `avatar-${uuidv4()}.webp`;
    
    await sharp(buffer)
        .resize(200, 200)
        .webp({ quality: 90 })
        .toFile(path.join('public/uploads/avatars', filename));
    
    return filename;
};

module.exports = {
    upload,
    processAvatar
}; 