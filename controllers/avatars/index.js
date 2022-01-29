const fs = require('fs/promises');
const path = require('path');

const avatars = async (req, res) => {
    const {path:tempDir, originalname} = req.file;
    const uploadDir = path.join(__dirname, '../../public/avatars', originalname);

    await fs.rename(tempDir, uploadDir);

    res.json({
        message: "It Work!"
    })
}

module.exports = avatars;