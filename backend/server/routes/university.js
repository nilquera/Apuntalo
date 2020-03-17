const express = require('express')
const _ = require('underscore')
let { verifyToken, verifyAdmin } = require('../middlewares/authentication')
let app = express()

let University = require('../models/university')

// Returns all Universities
app.get('/universities', (req, res) => {
    University.find({state: true})
        .sort('name')
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

// Returns university by id
app.get('/universities/:id', verifyToken, (req, res) => {
    let id = req.params.id
    University.findById(id, (err, universityDB) => {
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

// Creates a new University
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

// Create new degree in a university
app.post('/universities/:id/degrees', [verifyToken, verifyAdmin], (req, res) => {
    let body = req.body
    let id = req.params.id
    let newDegree = {
        name: body.name
    }
    University.findByIdAndUpdate(
        id,
        {$push: {degrees: newDegree}},
        {new: true, runValidators: true, context: 'query'},
        (err, universityDB) =>{
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

// Create new subject in a degree
app.post('/universities/:uid/degrees/:did/subjects', [verifyToken, verifyAdmin], (req, res) => {
    let body = req.body
    let uid = req.params.uid
    let did = req.params.did
    let newSubject = {
        name: body.name
    }

    University.update(
        {"_id": uid, "degrees._id": did},
        {"$push": {"degrees.$.subjects": newSubject}},
        {new: true, runValidators: true, context: 'query'},
        (err, universityDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }
            console.log(universityDB); // Error
            res.json({
                ok: true,
                message: "[FALTA IMPLENTAR-HO BÉ PERQUÈ universityDB SIGUI UNA UNI]",
                universityDB
            })
        })
})


// Updates University values
app.put('/universities/:id', [verifyToken, verifyAdmin], (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['name', 'city', 'state']);

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

// Deletes a University
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
