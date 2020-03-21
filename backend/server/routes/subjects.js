const express = require('express')
const _ = require('underscore')
let { verifyToken, verifyAdmin } = require('../middlewares/authentication')
let app = express()

let ObjectId = require('mongoose').Types.ObjectId
let Subject = require('../models/subject')
let Degree = require('../models/degree')

// Get all Subjects
app.get('/subjects', (req, res) => {
    Subject.find({state: true})
        // .populate('posts')
        .sort('name')
        .exec((err, subjects) => {
            if (err){
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            res.json({
                ok: true,
                subjects
            })
        })
})

// Get Subject by id
app.get('/subjects/:id', (req, res) => {
    let id = req.params.id
    Subject.findById(id)
    .populate({
        path: 'posts',
        select: 'meta state _id title date creator',
        populate: {
            path: 'creator',
            select: '_id username'
        }
    })
    .exec((err, subjectDB) => {
        if (err){
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!subjectDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Subject with id ${id} not found`
                }
            })
        }
        res.json({
            ok: true,
            subjectDB
        })
    })
})
// Create new Subject
app.post('/subjects', [verifyToken, verifyAdmin], (req, res) => {

    let body = req.body
    if (!body.name || !body.degreeId) {
        return res.status(400).json({
            ok: false,
            message: "name and degreeId are required"
        })
    }
    if (!ObjectId.isValid(body.degreeId)){
        return res.status(400).json({
            ok: false,
            message: "degreeId must be a valid id"
        })
    }

    Degree.findById(body.degreeId, (err, degreeDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }
        if (!degreeDB){
            return res.status(400).json({
                ok: false,
                message: "degreeId must be an existing id"
            })
        }

        let newSubject = new Subject({
            index: {
                name: body.name,
                degree: body.degreeId
            }
        })

        newSubject.save((err, subjectDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            Degree.findByIdAndUpdate(body.degreeId, {$push: {subjects: newSubject._id}}).exec()

            res.json({
                ok: true,
                subject: subjectDB
            })
        })
    })

})

// Update Subject values
app.put('/subjects/:id', [verifyToken, verifyAdmin], (req, res) => {
    let id = req.params.id
    let body = _.pick(req.body, ['name']);

    if (!body.name) {
        return res.status(400).json({
            ok: false,
            message: "You must provide a new name"
        })
    }

    body["index.name"] = body.name
    delete body.name

    Subject.findByIdAndUpdate(
        id,
        body,
        {new: true, runValidators: true,  context: 'query'},
        (err, subjectDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            if (!subjectDB){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: `Subject with id ${id} not found`
                    }
                })
            }

            res.json({
                ok: true,
                subject: subjectDB
            })
        }
    )
})

// Delete Subject
app.delete('/subjects/:id', [verifyToken, verifyAdmin], (req, res) => {
    let id = req.params.id

    Subject.findByIdAndUpdate(id, {state: false}, {new: true}, (err, subjectDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!subjectDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: `Subject with id ${id} not found`
                }
            })
        }

        res.json({
            ok: true,
            message: `Subject with id ${id} deleted`,
            subject: subjectDB
        })
    })
})

module.exports = app
