//========================
// Puerto
//========================
process.env.PORT = process.env.PORT || 3000;

//========================
// Entorno
//========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev' //la variable la setea heroku en produccion. Else -> dev

//========================
// Token Expiration Date
//========================
process.env.EXPIRATION_TOKEN = '30 days'

//========================
// Seed
//========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

//========================
// Base de datos
//========================
let urlDB
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cafe'
} else {
  urlDB = process.env.MONGO_URI
}

//========================
// Google Client ID
//========================
process.env.CLIENT_ID = process.env.CLIENT_ID || "623784351860-bpdr71vnevskdc6pkbd45er7oksb4i30.apps.googleusercontent.com"

process.env.URLDB = urlDB //la variable process.env.URLDB ens la inventem
