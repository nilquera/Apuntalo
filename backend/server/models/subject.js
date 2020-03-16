const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    degree: {
        type: Schema.Types.ObjectId,
        ref: 'Degree',
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

subjectSchema.plugin( uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('Subject', subjectSchema)
