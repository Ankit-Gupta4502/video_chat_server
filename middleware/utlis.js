const jwt = require("jsonwebtoken")
const checkToken = (req, res, next) => {
    const token = req.cookies.video_chat_token
    if (token) {
        jwt.verify(token, "SECRET_KEY", (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Auth token is not valid' });
            } else {
                req.decoded = decoded.data
                return next()
            }
        })
    } else {
        return res.status(400).json({ message: 'Auth token is not valid' });
    }
}

module.exports = { checkToken }