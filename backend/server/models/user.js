const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not a valid role'
}

let Schema = mongoose.Schema

let userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: validRoles,
        default: "USER_ROLE"
    },
    state: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: false
    },
    university: {
        type: String,
        required: false
    },
    degree: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    },
    google: {
        type: Boolean,
        default: false
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post' 
    }]
})

userSchema.methods.toJSON = function(){
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    return userObject
}

userSchema.plugin( uniqueValidator, { message: '{PATH} must be unique' })

module.exports = mongoose.model('User', userSchema)
