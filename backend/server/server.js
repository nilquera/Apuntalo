require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}))
//parse application/json
app.use(bodyParser.json())
// Configuración global de rutas
app.use(require('./routes/index'))

// Habilitar la carpeta public
// app.use(express.static(path.resolve(__dirname, '../public')))
app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  if (err) throw err
  console.log("base de datos ONLINE");
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando en puerto", process.env.PORT);
})
