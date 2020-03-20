const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let universitySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    city: String,
    state: {
        type: Boolean,
        default: true
    },
    degrees: [{
        type: Schema.Types.ObjectId,
        ref: 'Degree'
    }]
})

universitySchema.plugin( uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('University', universitySchema)
