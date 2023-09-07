const jwt = require("jsonwebtoken")
const checkToken = (req, res, next) => {
    const getToken = req.headers["x-access-token"] || req.headers["authorization"]
    const token = getToken?.slice(7, getToken?.length)
    console.log(token);
    if (token) {
        jwt.verify(token, "SECRET_KEY", (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: 'Auth token is not valid' });
            } else {
                console.log(decoded);
                req.decoded = decoded.data
                return next()
            }
        })
    } else {
        return res.status(400).json({ message: 'Auth token is not valid' });
    }
}

module.exports = { checkToken }