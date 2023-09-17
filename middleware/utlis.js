const jwt = require("jsonwebtoken")
const checkToken = (req, res, next) => {
    const getToken = req.headers["x-access-token"] || req.headers["authorization"] || `Bearer ${req.cookies.video_chat_token}`
    const token = getToken?.slice(7, getToken?.length)
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