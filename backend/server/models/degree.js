const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let degreeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    university: {
        type: Schema.Types.ObjectId,
        ref: 'University',
        required: true
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }]
})

degreeSchema.plugin( uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('Degree', degreeSchema)
