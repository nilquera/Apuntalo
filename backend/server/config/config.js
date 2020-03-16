// Default port
process.env.PORT = process.env.PORT || 3000;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev' //la variable la setea heroku en produccion. Else -> dev

//========================
// Token Expiration Date
//========================
process.env.EXPIRATION_TOKEN = '30 days'

//========================
// Seed
//========================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo'

// Database - In the future, this variable must be set in the platform, not in a file visible to anybody
// Per facilitar el development desde qualsevol equip, poso una DB de MongoDB Atlas
let urlDB = 'mongodb+srv://nilquera:FscBQBEkZ1gQSBkI@cluster0-ywque.mongodb.net/test?retryWrites=true&w=majority'
process.env.URLDB = urlDB // variable per poder accedir a urlDB desde qualsevol lloc
// if (process.env.NODE_ENV === 'dev') {
//   urlDB = 'mongodb://localhost:27017/cafe'
// } else {
//   urlDB = process.env.MONGO_URI
// }




//========================
// Google Client ID
//========================
process.env.CLIENT_ID = process.env.CLIENT_ID || "623784351860-bpdr71vnevskdc6pkbd45er7oksb4i30.apps.googleusercontent.com"
