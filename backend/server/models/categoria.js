const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let categoriaSchema = new Schema({
  descripcion: {
    type: String,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
})

categoriaSchema.plugin( uniqueValidator, { message: '{PATH} debe de ser único' })

module.exports = mongoose.model('Categoria', categoriaSchema)
