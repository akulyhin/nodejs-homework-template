const {User} = require('../../model');

const getAvatars = async (req, res) => {
    const {_id} = req.user;
    const user = await User.findById(_id);

    const {email, avatarURL} = user;

    res.json({
        status: "success",
        code: 200,
        result: {
            email,
            avatarURL 
            
        } 
    })
}


module.exports = getAvatars;