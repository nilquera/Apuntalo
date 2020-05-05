require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use('/api', require('./routes/index'))

// Habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../../frontend/dist/angularweb')))

mongoose
    .connect(process.env.URLDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("[ OK ] connected to database");
        app.listen(process.env.PORT)
    })
    .then(() => {
        console.log("[ OK ] listening on port", process.env.PORT);
    })
    .catch(err => {
        throw err
    })
