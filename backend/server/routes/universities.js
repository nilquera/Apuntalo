const express = require('express')
const _ = require('underscore')
let { verifyToken, verifyAdmin } = require('../middlewares/authentication')
let app = express()

let University = require('../models/university')

// Get all Universities
app.get('/universities', (req, res) => {
    University.find({state: true})
        .sort('name')
        // .populate({
        //     path: 'degrees',
        //     populate: {
        //         path: 'subjects',
        //         populate: {
        //             path: 'posts'
        //         }
        //     }
        // })
        .exec((err, universities) => {
            if (err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                universities
            })
        })
})

// Get a University by id
app.get('/universities/:id', (req, res) => {
    let id = req.params.id
    University.findById(id)
        .populate({
            path: 'degrees',
            // populate: {
            //     path: 'subjects',
            //     populate: {
            //         path: 'posts'
            //     }
            // }
        })
        .exec((err, universityDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!universityDB){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `University with id ${id} not found`
                    }
                })
            }

            res.json({
            ok: true,
            universityDB
        })
        })
})

// Create new University
app.post('/universities', [verifyToken, verifyAdmin], (req, res) => {
    let body = req.body
    let university = new University({
        name: body.name,
        city: body.city
    })

    university.save((err, universityDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            university: universityDB
        })
    })
})

// Update University values
app.put('/universities/:id', [verifyToken, verifyAdmin], (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['name', 'city', 'state']);
    console.log(body);
    University.findByIdAndUpdate(id, body, {new: true, runValidators: true,  context: 'query'}, (err, universityDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!universityDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: `University with id ${id} not found`
                }
            })
        }

        res.json({
            ok: true,
            university: universityDB
        })
    })
})

// Delete a University
app.delete('/universities/:id', [verifyToken, verifyAdmin], (req, res) => {
    let id = req.params.id

    University.findByIdAndUpdate(id, {state: false}, {new: true}, (err, universityDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!universityDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: `University with id ${id} not found`
                }
            })
        }

        res.json({
            ok: true,
            message: `University with id ${id} deleted`,
            university: universityDB
        })
    })
})

module.exports = app
