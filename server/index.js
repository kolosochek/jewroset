require('dotenv').config()
const express = require('express')
const sequelize = require("./db")
const models = require('./models/models')
const cors = require('cors')
const PORT = process.env.PORT || 5000;``
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHanlingMiddleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

// Error handler
app.use(errorHandler)

const start = async() => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

