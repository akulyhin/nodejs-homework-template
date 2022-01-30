const fs = require('fs/promises');
const path = require('path');
const {User} = require('../../model');
const Jimp = require('jimp');
const {Unauthorized} = require('http-errors');

const updateAvatars = async (req, res) => {
    const {_id} = req.user;

    const {path:tempDir, originalname} = req.file;

    const [extension] = originalname.split('.').reverse();
    const filename = `${_id}_avatar.${extension}`;

    const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename);

    const avatar = path.join('avatars', filename);
    const newAvatar = await User.findByIdAndUpdate(_id, {avatarURL:avatar}, {new: true});

    console.log(uploadDir);

    if (!newAvatar) {
        throw new Unauthorized();
    }

    await fs.rename(tempDir, uploadDir);

    // Jimp.read(uploadDir, (err, rsAvatar) => {
    //     rsAvatar.resize(250, 250).write('test.png');
    // })

    res.json({
        message: "Avatar is updated",
        code: 200,
        body: {
            avatar
        }
    })
}

module.exports = updateAvatars;