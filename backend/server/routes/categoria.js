const express = require('express')
let { verifyToken, verifyAdmin } = require('../middlewares/authentication')
let app = express()

let Categoria = require('../models/categoria')

app.get('/categoria', verifyToken, (req, res) => { //devuelve todas las categorias
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            Categoria.count((err, count) => {
                res.json({
                    ok: true,
                    count,
                    categorias
                })
            })
        })
})

app.get('/categoria/:id', verifyToken, (req, res) => { //mostrar una categoria con id
    let id = req.params.id
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Categoria not found"
                }
            })
        }

        res.json({
            ok: true,
            categoriaDB
        })
    })
})

app.post('/categoria', verifyToken, (req, res) => { //crea nueva categoria y la devuelve
    let body = req.body
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

app.put('/categoria/:id', verifyToken, (req, res) => { //actualiza la categoria
    let id = req.params.id
    let body = req.body

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, {new: true, runValidators: true}, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Categoria not found"
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})

app.delete('/categoria/:id', [verifyToken, verifyAdmin], (req, res) => { //borra categoria
    let id = req.params.id

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Categoria (id) not found"
                }
            })
        }

        res.json({
            ok: true,
            message: 'Categoria Borrada',
            categoria: categoriaDB
        })
    })
})

module.exports = app
