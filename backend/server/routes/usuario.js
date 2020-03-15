const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const Usuario = require('../models/usuario')
const { verifyToken, verifyAdmin } = require('../middlewares/authentication')
const app = express()

app.get('/usuario', verifyToken, (req, res) => {
    let from = req.query.from || 0
    from = Number(from)
    let limit = req.query.limit || 5
    limit = Number(limit)

    Usuario.find({estado: true}, 'nombre email role estado google img')
    .skip(from)
    .limit(limit)
    .exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        Usuario.count({estado: true}, (err, count) => {
            res.json({
                ok: true,
                count,
                usuarios
            })
        })
    })
})

app.post('/usuario', [verifyToken, verifyAdmin], (req, res) => {
    let body = req.body

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        // usuarioDB.password = null

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/usuario/:id', [verifyToken, verifyAdmin], (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.delete('/usuario/:id', [verifyToken, verifyAdmin], (req, res) => {
    let id = req.params.id

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User not found"
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
    //   if (err) {
    //     return res.status(400).json({
    //       ok: false,
    //       err
    //     })
    //   }
    //
    //   if (!usuarioBorrado){
    //     return res.status(400).json({
    //       ok: false,
    //       err: {
    //         message: "User not found"
    //       }
    //     })
    //   }
    //
    //   res.json({
    //     ok: true,
    //     usuario: usuarioBorrado
    //   })
    // })
})

module.exports = app
