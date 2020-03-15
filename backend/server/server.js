require('./config/config')

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(require('./routes/index'))

// Habilitar la carpeta public
// app.use(express.static(path.resolve(__dirname, '../public')))
// app.use(express.static(path.resolve(__dirname, '../public')));

mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  if (err) throw err
  console.log("[ OK ] connected to database");

  app.listen(process.env.PORT, () => {
      console.log("[ OK ] listening on port", process.env.PORT);
  })
});
