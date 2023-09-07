const express = require('express');
const routes = require('./Routes');
const cors = require('cors')
const db = require("./db")
const cookieParser = require("cookie-parser")
const app = express();
app.use(express.json({}))
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
const PORT = 8000
app.use('/api/v1', routes)

app.listen(PORT, () => console.log(`listening on ${PORT}`))