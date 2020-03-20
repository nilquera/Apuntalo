const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let degreeSchema = new Schema({
    index: {
        type: { //estableix una clau composta per degree: nom + universitat
            name: {
                type: String
            },
            university: {
                type: Schema.Types.ObjectId,
                ref: 'University'
            },
            unique: true
        },
        required: true,
        unique: true
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }],
    state: {
        type: Boolean,
        default: true
    }
})

degreeSchema.plugin( uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('Degree', degreeSchema)
