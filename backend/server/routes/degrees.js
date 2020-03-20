const express = require('express')
const _ = require('underscore')
let { verifyToken, verifyAdmin } = require('../middlewares/authentication')
let app = express()

let ObjectId = require('mongoose').Types.ObjectId;
let Degree = require('../models/degree')
let University = require('../models/university')

// Get all Degrees
app.get('/degrees', (req, res) => {
    Degree.find({state: true})
    .populate('subjects')
    .sort('name')
    .exec((err, degrees) => {
        if (err){
            return res.status(500).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            degrees
        })
    })
})

// Create new Degree
app.post('/degrees', [verifyToken, verifyAdmin], (req, res) => {

    let body = req.body
    if (!body.name || !body.universityId) {
        return res.status(400).json({
            ok: false,
            message: "name and universityId are required"
        })
    }
    if (!ObjectId.isValid(body.universityId)){
        return res.status(400).json({
            ok: false,
            message: "universityId must be a valid id"
        })
    }

    University.findById(body.universityId, (err, universityDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!universityDB){
            return res.status(400).json({
                ok: false,
                message: "universityId must be an existing id"
            })
        }

        let newDegree = new Degree({
            index: {
                name: body.name,
                university: body.universityId
            }
        })

        newDegree.save((err, degreeDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            University.findByIdAndUpdate(body.universityId, {$push: {degrees: newDegree._id}}).exec()

            res.json({
                ok: true,
                degree: degreeDB
            })
        })
    })

})

// Update Degree values
app.put('/degrees/:id', [verifyToken, verifyAdmin], (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['name', 'state']);

    if (!body.name) {
        return res.status(400).json({
            ok: false,
            message: "You must provide a new name"
        })
    }

    body["index.name"] = body.name
    delete body.name

    Degree.findByIdAndUpdate(
        id,
        body,
        {new: true, runValidators: true,  context: 'query'},
        (err, degreeDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!degreeDB){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `Degree with id ${id} not found`
                    }
                })
            }

            res.json({
                ok: true,
                degree: degreeDB
            })
        }
    )
})

// Delete Degree
app.delete('/degrees/:id', [verifyToken, verifyAdmin], (req, res) => {
    let id = req.params.id

    Degree.findByIdAndUpdate(id, {state: false}, {new: true}, (err, degreeDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!degreeDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Degree with id ${id} not found`
                }
            })
        }

        res.json({
            ok: true,
            message: `Degree with id ${id} deleted`,
            degree: degreeDB
        })
    })
})

module.exports = app
