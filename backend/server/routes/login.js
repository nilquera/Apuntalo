const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const User = require('../models/user')

const app = express()

// login with username or email
app.post('/login', (req, res) => {
    let body = req.body

    if (!body.password){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Password not provided'
            }
        })
    }

    User.findOne({ $or:[{email: body.email}, {username: body.username}]}, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(User) or password not valid'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, userDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User or (password) not valid'
                }
            })
        }

        if (userDB.state === false) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'User is disabled'
                }
            })
        }

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN })

        res.json({
            ok: true,
            user: userDB,
            token
        })
    })
})

// Google config
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();

    return { //Promesa
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

app.post('/google', async(req, res) => {
    let token = req.body.idtoken

    let googleUser = await verify(token)
    .catch( err => { //entra quan el token es fals, ha expirat...
        return res.status(403).json({
            ok: false,
            err
        })
    })

    User.findOne({email: googleUser.email}, (err, userDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (userDB){
            if (userDB.google === false){ //user ya existe pero no se registró con google
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "Debe de usar su autenticación normal"
                    }
                })
            } else { //user existe y se registró con google
                let token = jwt.sign({
                    user: userDB
                }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN })

                return res.json({
                    ok: true,
                    user: userDB,
                    token
                })
            }
        } else { //user no existe
            let user = new User();
            user.nombre = googleUser.nombre
            user.email = googleUser.email
            user.img = googleUser.img
            user.google = true
            user.password = ':)'

            user.save((err, userDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                let token = jwt.sign({
                    user: userDB
                }, process.env.SEED, { expiresIn: process.env.EXPIRATION_TOKEN })
                return res.json({
                    ok: true,
                    user: userDB,
                    token
                })
            })
        }
    })
})

module.exports = app
