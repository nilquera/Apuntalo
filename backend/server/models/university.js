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
        name: {
            type: String,
            unique: true,
            required: true
        },
        subjects: [{
            name: {
                type: String,
                required: true
            },
            posts: [{
                type: String //a implementar
            }],
            state: {
                type: Boolean,
                default: true
            }
        }],
        state: {
            type: Boolean,
            default: true
        }
    }]
})

universitySchema.plugin( uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('University', universitySchema)
