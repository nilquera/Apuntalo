const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let subjectSchema = new Schema({
    index: {
        type: { //estableix una clau composta per degree: nom + universitat
            name: {
                type: String
                //required: true CAL?
            },
            degree: {
                type: Schema.Types.ObjectId,
                ref: 'Degree'
                //required: true CAL?
            }
        },
        required: true,
        unique: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    state: {
        type: Boolean,
        default: true
    }
})

subjectSchema.plugin( uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('Subject', subjectSchema)
