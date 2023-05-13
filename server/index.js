require('dotenv').config()
const express = require('express')
const sequelize = require("./db")
const {Sequelize} = require("sequelize");
const models = require('./models/models')
const cors = require('cors')
const PORT = process.env.SERVER_PORT || 5000;
const fileUpload = require('express-fileupload');
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHanlingMiddleware')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

// Error handler
app.use(errorHandler)

const start = async() => {
    try {
        const sequelize = await new Sequelize({
            database: `${process.env.DB_NAME}`,
            username: `${process.env.DB_USER}`,
            password: `${process.env.DB_PASSWORD}`,
            host: `${process.env.DB_HOST}`,
            port: `${process.env.DB_PORT}`,
            dialect: "postgres",
            dialectOptions: {
                ssl: {
                    require: true, // This will help you. But you will see nwe error
                    rejectUnauthorized: false // This line will fix new error
                }
            },
        });
        await sequelize.authenticate()
        await sequelize.sync()
        //await sequelize.sync({ alter: true })
        //await sequelize.drop()

        // express API server start
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()

